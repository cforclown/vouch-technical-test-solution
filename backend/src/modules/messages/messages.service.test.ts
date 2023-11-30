import { container, setup } from '../../di-config';
import { mockChannel, mockCreateChannelPayload, mockUpdateGroupPayload } from '../../test/mock-channels-data';
import { ChannelsService } from './messages.service';

const mockChannelsDaoGet = jest.fn();
const mockChannelsDaoGetAll = jest.fn();
const mockChannelsDaoGetCreate = jest.fn();
const mockChannelsDaoGetUpdate = jest.fn();
const mockChannelsDaoGetDelete = jest.fn();
jest.mock('./channels.dao', () => ({
  ChannelsDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockChannelsDaoGet(payload),
    getAll: (payload: any): void => mockChannelsDaoGetAll(payload),
    create: (payload: any): void => mockChannelsDaoGetCreate(payload),
    update: (payload: any): void => mockChannelsDaoGetUpdate(payload),
    delete: (payload: any): void => mockChannelsDaoGetDelete(payload)
  }))
}));

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation(() => ({}))
}));

describe('channels-service', () => {
  mockChannelsDaoGet.mockReturnValue(Promise.resolve(mockChannel));
  mockChannelsDaoGetAll.mockReturnValue(Promise.resolve([mockChannel]));
  mockChannelsDaoGetCreate.mockReturnValue(Promise.resolve(mockChannel));
  mockChannelsDaoGetUpdate.mockReturnValue(Promise.resolve(mockChannel));
  mockChannelsDaoGetDelete.mockImplementation((payload) => Promise.resolve(payload));

  let channelsService: ChannelsService;

  beforeAll(() => {
    setup();
    channelsService = container.resolve(ChannelsService.INSTANCE_NAME);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get getAll', () => {
    it('should successfully return channel', async () => {
      expect(await channelsService.get(mockChannel.id)).toEqual(mockChannel);
      expect(await channelsService.getAll()).toEqual([mockChannel]);
    });

    it('should return null when channel not found', async () => {
      mockChannelsDaoGet.mockReturnValueOnce(null);

      expect(await channelsService.get(mockChannel.id)).toEqual(null);
    });
  });

  describe('create', () => {
    it('should successfully create a channel', async () => {
      expect(await channelsService.create(mockCreateChannelPayload)).toEqual(mockChannel);
    });
  });

  describe('update', () => {
    it('should successfully update a channel', async () => {
      expect(await channelsService.update(mockUpdateGroupPayload)).toEqual(mockChannel);
    });
  });

  describe('delete', () => {
    it('should successfully delete a channel', async () => {
      expect(await channelsService.delete('channel-id')).toEqual('channel-id');
    });
  });
});
