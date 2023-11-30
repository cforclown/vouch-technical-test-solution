export const MessagesSwaggerSchemas = {
  sendMsg: {
    type: 'object',
    properties: {
      channel: { type: 'string', required: true },
      text: { type: 'string', required: true }
    }
  },
  editMsg: {
    type: 'object',
    properties: {
      text: { type: 'string' }
    }
  }
};
