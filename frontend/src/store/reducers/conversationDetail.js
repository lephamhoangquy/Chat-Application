import { CONVERSATIONS } from '@constants';
const initialState = {
  data: null,
  loading: false,
  error: '',
};

let reducers = (state = initialState, action) => {
  switch (action.type) {
    case CONVERSATIONS.GET_CONVERSATION_BY_ID: {
      return { ...state, loading: true, error: '' };
    }
    case CONVERSATIONS.GET_CONVERSATION_BY_ID_SUCCESS: {
      const data = action.payload.data || [];
      return { ...state, loading: false, data, error: '' };
    }
    case CONVERSATIONS.GET_CONVERSATION_BY_ID_FAILED: {
      const message = action.payload.message || 'Error';
      return { ...state, loading: false, data: [], error: message };
    }
    default:
      return state;
  }
};

export default reducers;
