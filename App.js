import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import Root from './src/Root';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqBrGHxkelJc8Dgxk-wdPUTyIrWHkAvgk',
      authDomain: 'morning-monster.firebaseapp.com',
      databaseURL: 'https://morning-monster.firebaseio.com',
      projectId: 'morning-monster',
      storageBucket: 'morning-monster.appspot.com',
      messagingSenderId: '423602998161'
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
