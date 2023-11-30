import Server from './server';
import { setup } from './di-config';
import { config, ELogLevel, Logger } from './utils';

try {
  setup();
  config();
  new Server().start();
} catch (err) {
  if (err instanceof Error) {
    Logger.error(err.message, ELogLevel.ERROR);
  }
}
