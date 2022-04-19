import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Conversations, ConversationDetail } from '@components/chatBox';
import actions from '@store/actions/conversations';
import { useSearchParams } from 'react-router-dom';

const ChatBox = ({
  getConversations,
  conversations,
  getConversationByID,
  conversationDetail,
  users,
  newMessage,
}) => {
  const [searchParams] = useSearchParams();
  let conversationID = searchParams.get('conversationID') || null;

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="container">
      <h3 className=" text-center">Messaging</h3>
      <div className="messaging">
        <div className="inbox_msg">
          <Conversations
            list={conversations.data}
            loading={conversations.loading}
          />
          <ConversationDetail
            users={users}
            conversationID={conversationID}
            getConversationByID={getConversationByID}
            conversationDetail={conversationDetail}
            newMessage={newMessage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.conversations,
  conversationDetail: state.conversationDetail,
});

const mapDispatchToProps = {
  getConversations: actions.getConversations,
  getConversationByID: actions.getConversationByID,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
