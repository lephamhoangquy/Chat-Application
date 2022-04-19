import React, { useState, useEffect, useRef } from 'react';
import { Empty, message, Spin } from 'antd';
import moment from 'moment';
import MessageInput from './messageInput';
import socketIO from '@services/socketio.service';

const ConversationDetail = ({
  conversationID,
  getConversationByID,
  conversationDetail,
  users,
  newMessage,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversationID) {
      getConversationByID(conversationID, 10, 0);
    }
  }, [conversationID]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationDetail.data) {
      let messages = conversationDetail?.data?.messages || [];
      setMessages(messages.reverse());
    }
  }, [conversationDetail]);

  useEffect(() => {
    setMessages(() => [
      ...messages,
      {
        conversationID: newMessage.conversationID,
        message: newMessage.message,
        sender: { _id: newMessage.sender },
      },
    ]);
    scrollToBottom();
  }, [newMessage]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userID = users.data._id || null;
    if (userID) {
      socketIO.sendMessage(userID, conversationID, input);
      setMessages(() => [
        ...messages,
        {
          conversationID,
          message: input,
          fromSelf: true,
        },
      ]);
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mesgs">
      <Spin spinning={conversationDetail.loading}>
        {conversationDetail && conversationDetail.data ? (
          <>
            <div className="msg_history">
              {messages &&
                messages.map((msg, index) =>
                  msg?.sender?._id === users.data._id || msg?.fromSelf ? (
                    <div key={index} className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{msg.message}</p>
                        <span className="time_date">
                          {moment(msg.createdAt).calendar()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="incoming_msg">
                      <div className="incoming_msg_img">
                        <img
                          src="https://ptetutorials.com/images/user-profile.png"
                          alt="sunil"
                        />
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{msg.message}</p>
                          {moment(msg.createdAt).calendar()}
                          <span className="time_date"> {}</span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              <div ref={messagesEndRef}></div>
            </div>
            <MessageInput
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              value={input}
            />
          </>
        ) : (
          <Empty description={false} />
        )}
      </Spin>
    </div>
  );
};

export default ConversationDetail;
