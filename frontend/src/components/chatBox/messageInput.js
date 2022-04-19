import React from 'react';

const MessageInput = ({ handleChange, handleSubmit, value }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            type="text"
            className="write_msg"
            placeholder="Type a message"
            onChange={handleChange}
            value={value}
          />
          <button className="msg_send_btn" type="submit">
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
