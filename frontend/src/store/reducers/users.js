import { USERS } from '@constants';
const initialState = {
  data: [],
  loading: false,
  error: '',
};

let reducers = (state = initialState, action) => {
  switch (action.type) {
    case USERS.GET_ME: {
      return { ...state, loading: true, error: '' };
    }
    case USERS.GET_ME_SUCCESS: {
      const data = action.payload.data || [];
      return { ...state, loading: false, data, error: '' };
    }
    case USERS.GET_ME_FAILED: {
      const message = action.payload.message || 'Error';
      return { ...state, loading: false, data: [], error: message };
    }
    default:
      return state;
  }
};

export default reducers;
