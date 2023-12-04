import { Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  id: string;
  channel: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  archived?: boolean;
}
