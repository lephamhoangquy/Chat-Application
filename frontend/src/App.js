import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '@store/actions/users';
import socketIO from '@services/socketio.service';
import 'antd/dist/antd.css';
import ChatBox from './containers/chatBox';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/notFound';

const App = ({ users, getMe }) => {
  const [newMessage, setNewMessage] = useState({});

  useEffect(() => {
    getMe();
    socketIO.initSocketConnection();

    socketIO.subscribeToChat((err, data) => {
      setNewMessage(Object.assign({}, data));
    });

    return () => {
      socketIO.disconnectSocket();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/inbox" />} />
        <Route
          path="/inbox"
          element={<ChatBox users={users} newMessage={newMessage} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getMe: actions.getMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
