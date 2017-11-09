import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import * as actionCreators from './actions';

import Landing from './components/Landing';
import Home from './components/Home';

class Root extends Component {
  renderHome() {
    if (this.props.authed && !this.props.active) {
      return <Home />;
    } else {
      return <Landing />;
    }
  }

  render() {
    return <View style={styles.container}>{this.renderHome()}</View>;
  }
}

function mapStateToProps(state) {
  return {
    authed: state.auth.authed,
    active: state.alarm.active
  };
}

export default connect(mapStateToProps, actionCreators)(Root);

const styles = {
  container: {
    flex: 1
  }
};
