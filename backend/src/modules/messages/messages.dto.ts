import joi from 'joi';

export interface IStartConversationPayload {
  receiver: string;
  text: string;
};

export const startConversationPayloadSchema = joi.object<IStartConversationPayload>({
  receiver: joi.string().required(),
  text: joi.string().required()
});

export interface ISendMsgPayload {
  text: string;
};

export const sendMsgPayloadSchema = joi.object<ISendMsgPayload>({
  text: joi.string()
});

export type IEditMsgPayload = ISendMsgPayload

export const editMsgPayloadSchema = joi.object<IEditMsgPayload>({
  text: joi.string().required()
});
