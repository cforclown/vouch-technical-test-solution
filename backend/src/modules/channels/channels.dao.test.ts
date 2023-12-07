import mongoose, { Types } from 'mongoose';
import { ChannelsDao, channelsSchema, IChannelRaw } from '.';
import { mockCreateChannelPayload } from '../../test/mock-channels-data';
import MockDB from '../../test/mock-db';
import { docToJSON, expectDocumentToEqual } from '../../test/test-utils';

describe('channels-dao', () => {
  const db = new MockDB();
  mongoose.model<IChannelRaw>(ChannelsDao.MODEL_NAME, channelsSchema);
  const channelsDao = new ChannelsDao();

  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDB();
  });

  afterAll(async () => {
    await db.close();
  });

  it('create -> get => getAll', async () => {
    const doc = await channelsDao.create(mockCreateChannelPayload);
    expectDocumentToEqual(doc, mockCreateChannelPayload);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);

    const getAllResult = await channelsDao.getAll();
    expect(getAllResult.length).toEqual(1);
    expectDocumentToEqual(getAllResult[0], doc);
  });

  it('create -> update -> get', async () => {
    const doc = await channelsDao.create(mockCreateChannelPayload);
    expectDocumentToEqual(doc, mockCreateChannelPayload);

    const updateResult = await channelsDao.update({ id: doc.id, name: 'new name' });
    expectDocumentToEqual(updateResult, { ...docToJSON(doc), name: 'new name' }, true);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, updateResult);
  });

  it('create -> update (fail) -> get (same as before)', async () => {
    const doc = await channelsDao.create(mockCreateChannelPayload);
    expectDocumentToEqual(doc, mockCreateChannelPayload);

    const updateResult = await channelsDao.update({
      id: new Types.ObjectId().toString(),
      name: 'new name'
    });
    expect(updateResult).toEqual(null);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });

  it('create -> delete (success) -> get (null)', async () => {
    const doc = await channelsDao.create(mockCreateChannelPayload);
    expectDocumentToEqual(doc, mockCreateChannelPayload);

    const deletedExplorationId = await channelsDao.delete(doc.id);
    expect(deletedExplorationId).toBeTruthy();

    const getResult = await channelsDao.get(doc.id);
    expect(getResult).toEqual(null);
  });

  it('create -> delete (fail) -> get (exists)', async () => {
    const doc = await channelsDao.create(mockCreateChannelPayload);
    expectDocumentToEqual(doc, mockCreateChannelPayload);

    const deletedExplorationId = await channelsDao.delete(new Types.ObjectId().toString());
    expect(deletedExplorationId).toEqual(null);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });
});
