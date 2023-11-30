import Joi from 'joi';
import { EChannelRoles } from './channels.types';

export const createGroupPayloadSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().allow('').default(null),
  users: Joi.array().items(Joi.string()).required(),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  })).required()
});

export const updateGroupPayloadSchema = Joi.object({
  name: Joi.string(),
  desc: Joi.string(),
  users: Joi.array().items(Joi.string()),
  roles: Joi.array().items(Joi.object({
    user: Joi.string().required(),
    role: Joi.string().allow(EChannelRoles).required()
  }))
});
