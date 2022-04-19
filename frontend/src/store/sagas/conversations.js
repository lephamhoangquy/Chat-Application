import { put, takeEvery } from 'redux-saga/effects';
import { CONVERSATIONS } from '@constants';
import services from '@services/conversations';
import actions from '@store/actions/conversations';

function* getConversations() {
  const { data } = yield services.getConversations();
  if (data && data.code === 200) {
    yield put(actions.getConversationsSuccess(data.data));
  } else {
    let message = data.message || 'failed';
    yield put(actions.getConversationsFailed(message));
  }
}

export default function* watchConversations() {
  yield takeEvery(CONVERSATIONS.GET_CONVERSATION, getConversations);
}
