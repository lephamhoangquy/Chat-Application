import { CONVERSATIONS } from '@constants';

const getConversations = () => ({
  type: CONVERSATIONS.GET_CONVERSATION,
});

const getConversationsSuccess = (data) => ({
  type: CONVERSATIONS.GET_CONVERSATION_SUCCESS,
  payload: { data },
});

const getConversationsFailed = (msg) => ({
  type: CONVERSATIONS.GET_CONVERSATION_FAILED,
  payload: { data: msg },
});

const getConversationByID = (id, limit, offset) => ({
  type: CONVERSATIONS.GET_CONVERSATION_BY_ID,
  payload: {
    id,
    limit,
    offset,
  },
});

const getConversationByIDSuccess = (data) => ({
  type: CONVERSATIONS.GET_CONVERSATION_BY_ID_SUCCESS,
  payload: { data },
});

const getConversationByIDFailed = (msg) => ({
  type: CONVERSATIONS.GET_CONVERSATION_BY_ID_FAILED,
  payload: { data: msg },
});

export default {
  getConversations,
  getConversationsSuccess,
  getConversationsFailed,
  getConversationByID,
  getConversationByIDSuccess,
  getConversationByIDFailed,
};
