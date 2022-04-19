import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const ConversationItem = ({ data }) => {
  let updatedAt =
    moment(data?.messages[0]?.updatedAt).startOf('day').fromNow() || '';
  return (
    <div className="chat_list" style={{ cursor: 'pointer' }}>
      <Link to={`/inbox?conversationID=${data._id}`}>
        <div className="chat_people" style={{ paddingTop: '10px' }}>
          <div className="chat_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div className="chat_ib">
            <h5>
              {data?.title} <span className="chat_date">{updatedAt}</span>
            </h5>
            <p>{data?.messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ConversationItem;
