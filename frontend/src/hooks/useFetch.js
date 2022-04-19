import { useState, useEffect, useCallback } from 'react';
import conversationService from '@services/conversations';

const useFetch = (id, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      if (id) {
        await setLoading(true);
        await setError(false);
        const result = await conversationService.getConversationByID(
          id,
          10,
          page * 10
        );
        let messages = result?.data?.data?.messages;
        messages = messages.reverse();
        await setList((prev) => [...prev, ...messages]);
      }
    } catch (error) {
      setError(error);
    }
  }, [id, page]);

  useEffect(async () => {
    sendQuery();
  }, [id, page, sendQuery]);

  return { loading, error, messages: list };
};

export default useFetch;
