export const MessagesSwaggerSchemas = {
  startConversation: {
    type: 'object',
    properties: {
      receiver: { type: 'string', required: true },
      text: { type: 'string', required: true }
    }
  },
  sendMsg: {
    type: 'object',
    properties: {
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
