import { takeLatest, all, fork, put } from 'redux-saga/effects';
import { getChannelsAction } from './channels-actions';
import { IChannel, setChannelsLoading, setChannelsData } from '.';
import { sagaWrapperWithLoading } from '@/utils/saga-utils';
import { getChannels } from '../../../pages/home/pages/channels/channels.service';

function* setLoading(loading: boolean) {
  yield put(setChannelsLoading(loading));
}

function* getChannelsData() {
  const channels: IChannel[] = yield getChannels();
  yield put(setChannelsData(channels));
}

function* getChannelsSaga() {
  yield takeLatest(
    getChannelsAction.toString(), 
    function* () {
      yield sagaWrapperWithLoading(getChannelsData, setLoading);
    }
  );
}

function* channelsSaga() {
  yield all([
    fork(getChannelsSaga)
  ]);
}

export default channelsSaga;
