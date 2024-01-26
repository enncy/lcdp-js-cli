import { ApiController, Controller } from '@lcdp-js/core';
import { UserModel, User } from 'schema';
import { Request, Response } from 'express';

@Controller({ path: '/user', model: UserModel })
export class UserController extends ApiController<User, Request, Response> {}
