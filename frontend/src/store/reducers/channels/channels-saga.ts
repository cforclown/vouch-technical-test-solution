import { takeLatest, all, fork, put, select } from 'redux-saga/effects';
import { getChannelsAction, setSelectedChannelAction } from './channels-actions';
import { IChannel, setChannelsLoading, setChannels, setSelectedChannel, IMessage } from '.';
import { sagaWrapper, sagaWrapperWithLoading } from '@/store/store-utils';
import { getChannels } from '../../../pages/home/pages/channels/channels.service';
import { selectChannels, selectSelectedChannel } from './channels-selectors';
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
  /**
   * TODO
   * set unread messages to 0
   * call api to update meesage has been read
   */
}

function* onMsgOp(action: IReducerAction<IMessage>): any {
  const { payload: msg } = action;
  const selectedChannel: IChannel | undefined = cloneDeep(yield select(selectSelectedChannel()));
  if (selectedChannel?.id === msg.channel) {
    yield put(pushMsg(msg));
    selectedChannel.lastMessage = msg.text;
    selectedChannel.unreadMessages = 0;
    yield put(setSelectedChannel(selectedChannel));
  } else {
    const channels: IChannel[] = cloneDeep(yield select(selectChannels()));
    const channel = channels.find(c => c.id === msg.channel);
    if (channel) {
      channel.unreadMessages = (channel.unreadMessages ?? 0) + 1;
      yield put(setChannels(channels));
    } else {
      yield getChannelsOp();
    }
  }
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
