export const UsersSwaggerSchemas = {
  updateUser: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        default: null
      },
      email: {
        type: 'string',
        default: null
      },
      fullname: {
        type: 'string',
        default: null
      }
    }
  },
  changePassword: {
    type: 'object',
    properties: {
      currentPassword: { type: 'string', required: true },
      newPassword: { type: 'string', required: true },
      confirmNewPassword: { type: 'string', required: true }
    }
  }
};
