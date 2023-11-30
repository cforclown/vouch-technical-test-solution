import Joi from 'joi';

export const UpdateUserPayloadSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string()
});

export const ChangePasswordPayloadSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,24}$/).required(),
  confirmNewPassword: Joi
    .string()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
});
