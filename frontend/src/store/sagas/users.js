import { put, takeEvery } from 'redux-saga/effects';
import { USERS } from '@constants';
import services from '@services/users';
import actions from '@store/actions/users';

function* getMe() {
  const { data } = yield services.getMe();
  if (data && data.code === 200) {
    yield put(actions.getMeSuccess(data.data));
  } else {
    let message = data.message || 'failed';
    yield put(actions.getMeFailed(message));
  }
}

export default function* watchUsers() {
  yield takeEvery(USERS.GET_ME, getMe);
}
