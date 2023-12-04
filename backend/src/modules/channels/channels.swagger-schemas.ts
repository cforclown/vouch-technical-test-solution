export const ChannelsSwaggerSchemas = {
  createGroup: {
    type: 'object',
    properties: {
      name: { type: 'string', required: true },
      desc: { type: 'date' },
      users: { type: 'array', items: 'string', required: true },
      roles: {
        type: 'object',
        properties: {
          user: { type: 'string', required: true },
          role: { type: 'string', enum: ['owner', 'admin', 'member'], required: true }
        }
      }
    }
  },
  upgradeGroup: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      desc: { type: 'string' },
      roles: {
        type: 'object',
        properties: {
          user: { type: 'string', required: true },
          role: { type: 'string', enum: ['owner', 'admin', 'member'], required: true }
        }
      }
    }
  }
};
