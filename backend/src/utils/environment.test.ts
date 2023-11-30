import { Environment } from './environment';

describe('environment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully return environment variable value', () => {
    expect(Environment.getNodeEnv()).toBeTruthy();
  });

  it('should throw an error when environment variable not found', () => {
    process.env.NODE_ENV = ''; // it should be undefined, but somehow when you assign NODE_ENV to undefined, it will be parsed to string 'undefined'
    expect(Environment.getNodeEnv).toThrowError();
  });
});
