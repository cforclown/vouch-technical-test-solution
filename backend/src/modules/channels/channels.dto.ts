import Joi from 'joi';
import { EChannelRoles } from './channels.types';

export interface ICreateGroupDto {
  name: string;
  desc?: string;
  users: string[];
  roles: {
    user: string;
    role: EChannelRoles
  }[];
}

export const createGroupDtoSchema = Joi.object<ICreateGroupDto>({
  name: Joi.string().required(),
  desc: Joi.string().allow('').default(null),
  users: Joi.array().items(Joi.string()).required(),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  })).required()
});

export interface IUpdateGroupDto {
  name?: string;
  desc?: string;
  roles?: {
    user: string;
    role: EChannelRoles
  }[];
}

export const updateGroupDtoSchema = Joi.object<IUpdateGroupDto>({
  name: Joi.string(),
  desc: Joi.string(),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  }))
});
