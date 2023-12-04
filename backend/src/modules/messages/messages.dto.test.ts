import { validateSchema } from '../../utils/validate-schema';
import { ValidationException } from '../../utils/exceptions/validation-exception';
import { editMsgPayloadSchema, sendMsgPayloadSchema } from './messages.dto';
import { mockCreateGroupPayload, mockUpdateGroupPayload } from '../../test/mock-channels-data';

describe('channels.dto', () => {
  describe('CreateGroupPayloadSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({
        schema: sendMsgPayloadSchema,
        payload: mockCreateGroupPayload
      });
      expect(result).toEqual(mockCreateGroupPayload);
    });

    it('should throw validation exception when required field not provided', () => {
      expect(() => validateSchema({
        schema: sendMsgPayloadSchema,
        payload: {
          ...mockCreateGroupPayload,
          name: undefined
        }
      })).toThrow(ValidationException);
    });
  });

  describe('UpdateGroupPayloadSchema', () => {
    it('should return value when schema is valid', () => {
      expect(validateSchema({
        schema: editMsgPayloadSchema,
        payload: mockUpdateGroupPayload
      })).toEqual(mockUpdateGroupPayload);

      expect(validateSchema({
        schema: editMsgPayloadSchema,
        payload: { name: 'new name' }
      })).toEqual({ name: 'new name' });
    });

    it('should throw validation exception when payload is not object', () => {
      expect(() => validateSchema({ schema: editMsgPayloadSchema, payload: null })).toThrow(ValidationException);
    });
  });
});
