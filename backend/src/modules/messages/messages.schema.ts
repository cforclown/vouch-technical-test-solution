import { Schema, Types } from 'mongoose';
import { USERS_COLLECTION_NAME } from '../users';

export interface IMessage {
  _id: Types.ObjectId;
  id: string;
  channel: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  read?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export const messagesSchema = new Schema<IMessage>({
  channel: {
    type: Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: USERS_COLLECTION_NAME,
    required: true
  },
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

// virtualize _id to id when doing query
messagesSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
messagesSchema.set('toJSON', {
  virtuals: true
});
