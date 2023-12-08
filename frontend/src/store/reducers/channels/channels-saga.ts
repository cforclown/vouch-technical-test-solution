import { takeLatest, all, fork, put, select } from 'redux-saga/effects';
import { getChannelsAction, setSelectedChannelAction } from './channels-actions';
import { IChannel, setChannelsLoading, setChannels, setSelectedChannel, IMessage } from '.';
import { sagaWrapper, sagaWrapperWithLoading } from '@/store/store-utils';
import { getChannels, readMsgs } from '../../../pages/home/pages/channels/channels.service';
import { selectSelectedChannel } from './channels-selectors';
import { IReducerAction } from '@/utils/common';
import { pushMsg } from '../messages';
import { onMsgAction } from '../messages/messages-actions';
import { cloneDeep } from 'lodash';

function* setLoading(loading: boolean) {
  yield put(setChannelsLoading(loading));
}

function* getChannelsOp() {
  const channels: IChannel[] = yield getChannels();
  yield put(setChannels(channels));
}

function* msgHasBeenRead(channel: IChannel) {
  try {
    yield readMsgs(channel.id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update message read');
  }
}

function* setSelectedChannelOp({ payload }: IReducerAction<IChannel>): any {
  const channels: IChannel[] = yield getChannels();
  if (!payload) {
    yield put(setSelectedChannel(undefined));
    yield put(setChannels(channels));
    return; 
  }

  const channel = channels.find(c => c.id === payload.id);
  if (!channel) {
    if (payload.id === 'new') {
      yield put(setSelectedChannel(payload));
    }
    yield put(setChannels(channels));
    return;
  }
  
  channel.unreadMessages = 0;
  yield put(setSelectedChannel(channel));
  yield put(setChannels(channels));
  yield msgHasBeenRead(channel);
}

function* onMsgOp(action: IReducerAction<IMessage>): any {
  const { payload: msg } = action;
  const channels: IChannel[] = yield getChannels();
  const selectedChannel: IChannel | undefined = cloneDeep(yield select(selectSelectedChannel()));
  const channel = channels.find(c => c.id === msg.channel);
  if (selectedChannel?.id === msg.channel) {
    yield put(pushMsg(msg));
    selectedChannel.lastMessage = msg.text;
    selectedChannel.unreadMessages = 0;

    yield put(setSelectedChannel(selectedChannel));

    if (channel) {
      channel.unreadMessages = 0;
      yield msgHasBeenRead(channel);
    }
  }

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

function* setSelectedChannelSaga() {
  yield takeLatest(
    setSelectedChannelAction.toString(),
    function* (action: IReducerAction<IChannel>) {
      yield sagaWrapper(setSelectedChannelOp, action);
    }
  );
}

function* onMsg() {
  yield takeLatest(
    onMsgAction.toString(),
    function* (action: IReducerAction<IMessage>) {
      yield sagaWrapper(onMsgOp, action);
    }
  );
}

function* channelsSaga() {
  yield all([
    fork(getChannelsSaga),
    fork(setSelectedChannelSaga),
    fork(onMsg)
  ]);
}

export default channelsSaga;
