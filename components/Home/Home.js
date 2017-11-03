import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Alarm from '../Alarm/Alarm';

export default class Home extends Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <View style={styles.container}>
          <Text>Home</Text>
        </View>
        <Swiper horizontal={false} loop={false} showsPagination={false}>
          <View style={styles.container}>
            <Alarm />
          </View>
        </Swiper>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
