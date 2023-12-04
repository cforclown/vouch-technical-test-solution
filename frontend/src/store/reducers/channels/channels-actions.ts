import { createAction } from '@reduxjs/toolkit';

export const getChannelsAction = createAction('getChannelsAction');
export const setChannelsAction = createAction('setChannelsAction');
export const getMsgsByPage = createAction('getMsgsByPage');
export const getMsgsNextPage = createAction('getMsgsNextPage');
