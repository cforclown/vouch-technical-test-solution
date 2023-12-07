// Dont change the order of the imports
import { setup } from './di-config';
import { config, Logger } from './utils';
import Server from './server';

try {
  config();
  setup();
  new Server().start();
} catch (err: any) {
  Logger.exception(err);
}
