import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Swiper from 'react-native-swiper';

import Alarm from './Alarm';

export default class Home extends Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <View style={styles.container}>
          <Button title="Logout" onPress={() => this.props.logoutUser()} />
          <Text>Home</Text>
        </View>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          scrollEnabled={false}
        >
          <View style={styles.container}>
            <Alarm />
          </View>
        </Swiper>
      </Swiper>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
