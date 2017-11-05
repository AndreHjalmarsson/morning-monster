import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import * as actionCreators from './actions';

import Landing from './components/Landing';
import Home from './components/Home';

export default class Root extends Component {
  renderHome() {
    if (this.props.auth) {
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
    auth: state.auth.authed
  };
}

connect(mapStateToProps, actionCreators)(Root);

const styles = {
  container: {
    flex: 1
  }
};
