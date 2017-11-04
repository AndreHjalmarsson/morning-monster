import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';

import Landing from './components/Landing';
import Home from './components/Home';

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
      <Swiper loop={false} showsPagination={false} index={0}>
        <View style={styles.container}>
          <Landing />
        </View>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View style={styles.container}>
            <Home />
          </View>
        </Swiper>
      </Swiper>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};
