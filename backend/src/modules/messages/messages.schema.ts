import { Schema, Types } from 'mongoose';
import { USERS_COLLECTION_NAME } from '../users';
import { IMessage } from './messages.types';
import { CHANNELS_COLLECTION_NAME } from '../channels';

export const messagesSchema = new Schema<IMessage>({
  channel: {
    type: Types.ObjectId,
    ref: CHANNELS_COLLECTION_NAME,
    required: true
  },
  sender: {
    type: Types.ObjectId,
    ref: USERS_COLLECTION_NAME,
    required: true
  },
  text: { type: String, required: true },
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
