import { sign, verify } from 'jsonwebtoken';
import { HttpStatusCode } from 'axios';
import { ILoginPayload, IRegisterUserPayload, IUserContext } from '.';
import { IUser, UsersService } from '..';
import { Environment, RestApiException } from '../../utils';

export class AuthService {
  public static readonly INSTANCE_NAME = 'authService'

  private readonly usersService: UsersService;

  constructor (usersService: UsersService) {
    this.usersService = usersService;
  }

  async getUserById (userId: string): Promise<IUser> {
    const user = await this.usersService.get(userId);
    if (!user) {
      throw new RestApiException('User not found');
    }
    return user;
  }

  async authenticate (payload: ILoginPayload): Promise<IUser | null> {
    return this.usersService.authenticate(payload);
  }

  async login (payload: ILoginPayload): Promise<IUserContext> {
    const user = await this.usersService.authenticate(payload);
    if (!user) {
      throw new RestApiException('Incorrect username or password', HttpStatusCode.NotFound);
    }
    return this.generateAccessToken(user);
  }

  async verify (user?: IUser): Promise<IUserContext> {
    if (!user) {
      throw new Error('No user object in request');
    }
    return this.generateAccessToken(user);
  }

  async register (payload: IRegisterUserPayload): Promise<IUserContext> {
    if (payload.password !== payload.confirmPassword) {
      throw new RestApiException('Confirm password is not match');
    }
    const user = await this.usersService.create(payload);
    return this.generateAccessToken(user);
  }

  async refresh (refreshToken: string): Promise<IUserContext> {
    try {
      const tokenData = verify(refreshToken, Environment.getRefreshTokenSecret());
      const user = await this.usersService.get((tokenData as IUser).id);
      if (!user) {
        throw new RestApiException('Refresh token is not valid', HttpStatusCode.Unauthorized);
      }
      return this.generateAccessToken(user);
    } catch (err) {
      throw new RestApiException('Refresh token is expired', HttpStatusCode.Unauthorized);
    }
  }

  async verifyAccessToken (accessToken: string): Promise<IUser> {
    try {
      const tokenData = verify(accessToken, Environment.getAccessTokenSecret());
      const user = await this.usersService.get((tokenData as IUser).id);
      if (!user) {
        throw new RestApiException('Refresh token is not valid', HttpStatusCode.Unauthorized);
      }

      return user;
    } catch (err) {
      throw new RestApiException('Refresh token is expired', HttpStatusCode.Unauthorized);
    }
  }

  generateAccessToken (user: IUser): IUserContext {
    const expiresIn = Environment.getAccessTokenExpIn();
    const accessToken = sign({ ...user.toJSON() }, Environment.getAccessTokenSecret(), { expiresIn });
    const refreshToken = sign({ ...user.toJSON() }, Environment.getRefreshTokenSecret(), { expiresIn: Environment.getRefreshTokenExpIn() });

    return {
      user,
      accessToken,
      refreshToken,
      expiresIn
    };
  }
}
