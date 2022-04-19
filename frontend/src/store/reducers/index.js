import { combineReducers } from 'redux';
import conversations from './conversations';
import conversationDetail from './conversationDetail';
import users from './users';

export default combineReducers({ conversations, conversationDetail, users });
