import { USERS } from '@constants';

const getMe = () => ({
  type: USERS.GET_ME,
});

const getMeSuccess = (data) => ({
  type: USERS.GET_ME_SUCCESS,
  payload: { data },
});

const getMeFailed = (msg) => ({
  type: USERS.GET_ME_FAILED,
  payload: { data: msg },
});

export default {
  getMe,
  getMeSuccess,
  getMeFailed,
};
