import { put, takeEvery } from 'redux-saga/effects';
import { CONVERSATIONS } from '@constants';
import services from '@services/conversations';
import actions from '@store/actions/conversations';

function* getConversationByID({ payload }) {
  const { id, limit, offset } = payload;
  if (id) {
    const { data } = yield services.getConversationByID(id, limit, offset);
    if (data && data.code === 200) {
      yield put(actions.getConversationByIDSuccess(data.data));
    } else {
      let message = data.message || 'failed';
      yield put(actions.getConversationByIDFailed(message));
    }
  }
  return;
}

export default function* watchConversationDetail() {
  yield takeEvery(CONVERSATIONS.GET_CONVERSATION_BY_ID, getConversationByID);
}
