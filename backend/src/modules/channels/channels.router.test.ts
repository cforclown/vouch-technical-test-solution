import { Express } from 'express';
import request from 'supertest';
import { HttpStatusCode } from 'axios';
import { container, setup } from '../../di-config';
import { mockChannelApiRes, mockExplorationPayload, mockUpdateGroupPayload } from '../../test/mock-channels-data';
import { RestApiException } from '../../utils/exceptions';
import { Environment } from '../../utils';
import { mockUser } from '../../test/mock-users-data';

const mockJWTVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockImplementation((token: string, secret: string) => mockJWTVerify(token, secret))
}));

const mockModel = jest.fn();
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation((collection: string): string => mockModel(collection))
}));

const mockChannelsDaoGet = jest.fn();
const mockChannelsDaoGetAll = jest.fn();
const mockChannelsDaoExplore = jest.fn();
const mockChannelsDaoCreate = jest.fn();
const mockChannelsDaoUpdate = jest.fn();
const mockChannelsDaoDelete = jest.fn();
jest.mock('./channels.dao', () => ({
  ChannelsDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockChannelsDaoGet(payload),
    getAll: (payload: any): void => mockChannelsDaoGetAll(payload),
    explore: (payload: any): void => mockChannelsDaoExplore(payload),
    create: (payload: any): void => mockChannelsDaoCreate(payload),
    update: (payload: any): void => mockChannelsDaoUpdate(payload),
    delete: (payload: any): void => mockChannelsDaoDelete(payload)
  }))
}));

describe('channels-router', () => {
  mockChannelsDaoGet.mockResolvedValue(mockChannelApiRes);
  mockChannelsDaoGetAll.mockResolvedValue([mockChannelApiRes]);
  mockChannelsDaoExplore.mockImplementation((payload) => ({
    data: [mockChannelApiRes],
    exploration: payload
  }));
  mockChannelsDaoCreate.mockResolvedValue(mockChannelApiRes);
  mockChannelsDaoUpdate.mockResolvedValue(mockChannelApiRes);
  mockChannelsDaoDelete.mockImplementation((payload) => Promise.resolve(payload));

  mockJWTVerify.mockReturnValue(mockUser);

  let app: Express;

  beforeAll(() => {
    setup();
    app = container.resolve('app');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should successfully return channel', async () => {
      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);

      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelApiRes);
    });

    it('should return 404 when channel not found', async () => {
      mockChannelsDaoGet.mockReturnValueOnce(Promise.resolve(null));
      await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('getAll', () => {
    it('should successfully get all channels', async () => {
      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual([mockChannelApiRes]);
    });

    it('should return empty', async () => {
      mockChannelsDaoGetAll.mockReturnValueOnce(Promise.resolve([]));

      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual([]);
    });

    it('should return internal server error', async () => {
      mockChannelsDaoGetAll.mockRejectedValueOnce(new Error('error'));

      await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.InternalServerError);
    });
  });

  describe('explore', () => {
    it('should successfully get channels with correct exploration payload', async () => {
      const response = await request(app)
        .post(`/api/${Environment.getApiVersion()}/channels/explore`)
        .send(mockExplorationPayload)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual({
        data: [mockChannelApiRes],
        exploration: {
          ...mockExplorationPayload,
          pagination: {
            ...mockExplorationPayload.pagination,
            sort: {
              ...mockExplorationPayload.pagination.sort,
              order: mockExplorationPayload.pagination.sort.order
            }
          }
        }
      });
    });

    it('should return internal server error', async () => {
      mockChannelsDaoGetAll.mockRejectedValueOnce(new Error('error'));

      await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.InternalServerError);
    });
  });

  describe('update', () => {
    it('should successfully update channel', async () => {
      const response = await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .send(mockUpdateGroupPayload)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelApiRes);
    });

    it('should successfully update channel when only some of the field is provided', async () => {
      const response = await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .send({
          name: 'new-name'
        })
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelApiRes);
    });

    it('should fail update channel when channel not found', async () => {
      mockChannelsDaoUpdate.mockResolvedValueOnce(null);

      await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .send(mockUpdateGroupPayload)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('delete', () => {
    it('should successfully delete a channel', async () => {
      const response = await request(app)
        .delete(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelApiRes.id);
    });

    it('should throw an error when data access object throw an error', async () => {
      mockChannelsDaoDelete.mockRejectedValueOnce(new RestApiException('internal server error', 500));
      await request(app)
        .delete(`/api/${Environment.getApiVersion()}/channels/${mockChannelApiRes.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.InternalServerError);
    });
  });
});
