import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import Landing from './components/Landing';
import Home from './components/Home';

export default class Root extends Component {
  constructor() {
    super();

    this.state = { loggedIn: false };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqBrGHxkelJc8Dgxk-wdPUTyIrWHkAvgk',
      authDomain: 'morning-monster.firebaseapp.com',
      databaseURL: 'https://morning-monster.firebaseio.com',
      projectId: 'morning-monster',
      storageBucket: 'morning-monster.appspot.com',
      messagingSenderId: '423602998161'
    });

    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.setState({ loggedIn: true })
        : this.setState({ loggedIn: false });
    });
  }

  logoutUser() {
    this.setState({ loggedIn: false });
  }

  renderHome() {
    if (this.state.loggedIn) {
      return <Home logoutUser={this.logoutUser.bind(this)} />;
    } else {
      return <Landing />;
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>{this.renderHome()}</View>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};
