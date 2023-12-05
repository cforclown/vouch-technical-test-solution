import Server from './server';
import { setup } from './di-config';
import { config, Logger } from './utils';

try {
  config();
  setup();
  new Server().start();
} catch (err: any) {
  Logger.exception(err);
}
