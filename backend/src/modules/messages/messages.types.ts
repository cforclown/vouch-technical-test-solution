import { ObjectId, Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  id: string;
  channel: ObjectId;
  sender: ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  archived?: boolean;
}

export interface ISendMsgPayload {
  channel: string;
  sender: string;
  text: string;
};

export interface IEditMsgPayload {
  text: string;
}
