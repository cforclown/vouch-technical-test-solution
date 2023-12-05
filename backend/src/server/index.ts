import { Express } from 'express';
import Database from '../database';
import { container } from '../di-config';
import { Environment, Logger } from '../utils';
import initSocketIO, { IO_INSTANCE_NAME } from '../socketio';
import { asValue } from 'awilix';
import SIOController from '../socketio/sio.controller';

export default class Server {
  public static readonly INSTANCE_NAME: string = 'server';

  private readonly db: Database;
  private readonly app: Express;
  private readonly sioController: SIOController;

  constructor () {
    this.db = container.resolve('database');
    this.app = container.resolve('app');
    this.sioController = container.resolve(SIOController.INSTANCE_NAME);
  }

  async start (): Promise<void> {
    try {
      Logger.success('============================================================================');
      Logger.success(`| ${Environment.getNodeEnv().toUpperCase()} MODE`);
      await this.db.connect();
      Logger.success('| ✅ SUCCESSFULLY CONNECTED TO THE DATABASE');

      const port = Environment.getPort();
      const server = await this.app.listen(port);
      Logger.success(`| ⚡ SERVER STARTED SUCCESSFULLY [${port}]`);

      const sio = initSocketIO(server, this.sioController);
      this.app.set(IO_INSTANCE_NAME, sio);
      container.register(IO_INSTANCE_NAME, asValue(sio));
      Logger.success('| ⚡️ SOCKET.IO STARTED SUCCESSFULLY');
      Logger.success('============================================================================');
    } catch (err: any) {
      Logger.exception(err);
    }
  }
}
