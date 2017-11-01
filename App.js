import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

export default class App extends Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
