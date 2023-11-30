import mongoose from 'mongoose';
import { Environment } from '../utils';
import { CHANNELS_COLLECTION_NAME, channelsSchema, USERS_COLLECTION_NAME, usersSchema } from '../modules';

class Database {
  public static readonly INSTANCE_NAME = 'database';

  constructor () {
    this.connect = this.connect.bind(this);
    this.registerModels();
  }

  async connect (): Promise<void> {
    await mongoose.connect(Environment.getDBConnectionString());
  }

  close (): void {
    mongoose.disconnect();
  }

  registerModels (): void {
    mongoose.model(USERS_COLLECTION_NAME, usersSchema);
    mongoose.model(CHANNELS_COLLECTION_NAME, channelsSchema);
  }
}

export default Database;
