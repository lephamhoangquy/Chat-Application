import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
// import 'antd/dist/antd.less';
import './style.css';
// import '@common/style/root.css';
// import '@common/style/custom-ant.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
