import { all, fork } from 'redux-saga/effects';
import conversations from './conversations';
import conversationDetail from './conversationDetail';
import users from './users';

export default function* rootSaga() {
  yield all[
    [
      yield fork(conversations),
      yield fork(conversationDetail),
      yield fork(users),
    ]
  ];
}
