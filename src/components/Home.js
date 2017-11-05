import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Alarm from './Alarm';

class Home extends Component {
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

function mapStateToProps(state) {
  return {
    authed: state.auth.authed
  };
}

export default connect(mapStateToProps, actionCreators)(Home);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
