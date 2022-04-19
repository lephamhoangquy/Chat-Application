import React from 'react';
import ConversationItem from './conversationItem';
import { Spin } from 'antd';
const Conversations = ({ list, loading }) => {
  return (
    <div className="inbox_people">
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>Recent</h4>
        </div>
        <div className="srch_bar">
          <div className="stylish-input-group">
            <input type="text" className="search-bar" placeholder="Search" />
            <span className="input-group-addon">
              <button type="button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
      <Spin size="default" spinning={loading}>
        <div className="inbox_chat">
          {list &&
            list.map((item, index) => (
              <ConversationItem key={index} data={item} />
            ))}
        </div>
      </Spin>
    </div>
  );
};

export default Conversations;
