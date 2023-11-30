import express from 'express';
import { AuthService, IUserContext } from '.';
import { IUser } from '..';

export class AuthController {
  public static readonly INSTANCE_NAME = 'authController';

  private readonly authService: AuthService;

  constructor (authService: AuthService) {
    this.authService = authService;

    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
    this.register = this.register.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async login ({ body }: express.Request): Promise<IUserContext> {
    return this.authService.login(body);
  }

  async register ({ body }: express.Request): Promise<IUserContext> {
    return this.authService.register(body);
  }

  async verify ({ user }: express.Request): Promise<IUserContext> {
    return this.authService.verify(user as IUser);
  }

  async refresh ({ body }: express.Request): Promise<IUserContext> {
    return this.authService.refresh(body.refreshToken);
  }
}
