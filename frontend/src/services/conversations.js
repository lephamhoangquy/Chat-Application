import { send } from '@utils/request';
import { setHeaders } from '@utils/auth';

let conversationService = {
  getConversations: async () => {
    let uri = 'api/conversation/getConversations';
    return await send(process.env.SERVER_URL, uri, 'GET', setHeaders());
  },

  getConversationByID: async (id, limit = 10, offset = 0) => {
    let uri = `api/conversation/getByID/${id}?limit=${limit}&offset=${offset}`;
    return await send(process.env.SERVER_URL, uri, 'GET', setHeaders());
  },
};

export default conversationService;
