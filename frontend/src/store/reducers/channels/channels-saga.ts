import { takeLatest, all, fork, put, select } from 'redux-saga/effects';
import { getChannelsAction, setSelectedChannelAction } from './channels-actions';
import { IChannel, setChannelsLoading, setChannels, setSelectedChannel } from '.';
import { sagaWrapper, sagaWrapperWithLoading } from '@/store/store-utils';
import { getChannels } from '../../../pages/home/pages/channels/channels.service';
import { selectChannels } from './channels-selectors';
import { IReducerAction } from '@/utils/common';

function* setLoading(loading: boolean) {
  yield put(setChannelsLoading(loading));
}

function* getChannelsOp() {
  const channels: IChannel[] = yield getChannels();
  yield put(setChannels(channels));
}

function* getChannelsSaga() {
  yield takeLatest(
    getChannelsAction.toString(), 
    function* () {
      yield sagaWrapperWithLoading(getChannelsOp, setLoading);
    }
  );
}

function* setSelectedChannelOp(action: IReducerAction<IChannel>): any {
  yield getChannelsOp();
  const channels = yield select(selectChannels());
  let channel = { ...action.payload };
  if (action.payload.id !== 'new') {
    channel = channels.find((c: IChannel) => c.id === action.payload.id);
    if (!channel) {
      return;
    }
  }

  yield put(setSelectedChannel(channel));
}

function* setSelectedChannelSaga() {
  yield takeLatest(
    setSelectedChannelAction.toString(),
    function* (action: IReducerAction<IChannel>) {
      yield sagaWrapper(setSelectedChannelOp, action);
    }
  );
}

function* channelsSaga() {
  yield all([
    fork(getChannelsSaga),
    fork(setSelectedChannelSaga)
  ]);
}

export default channelsSaga;
