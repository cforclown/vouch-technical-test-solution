import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import LayoutReducer, { ILayoutState } from './reducers/layout';
import UsercontextReducer, { IUserContextState } from './reducers/user-context';
import AlertDialogReducer, { IAlertDialogState } from './reducers/alert-dialog';
import ChannelsReducer, { IChannelsState } from './reducers/channels';
import { all, fork } from 'redux-saga/effects';
import channelsSaga from './reducers/channels/channels-saga';

export interface IAppState {
  layout: ILayoutState;
  userContext: IUserContextState;
  alertDialog: IAlertDialogState;
  channels: IChannelsState;
}

const reducers = combineReducers({
  layout: LayoutReducer,
  userContext: UsercontextReducer,
  alertDialog: AlertDialogReducer,
  channels: ChannelsReducer
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* rootSaga() {
  yield all([
    fork(channelsSaga)
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: () => [ sagaMiddleware ]
});

sagaMiddleware.run(rootSaga);

export default store;
