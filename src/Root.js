import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from './actions';

import Landing from './components/Landing';
import Home from './components/Home';

import { BackgroundImage } from './components/common';

class Root extends Component {
  renderHome() {
    if (this.props.authed) {
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
    authed: state.auth.authed
  };
}

export default connect(mapStateToProps, actionCreators)(Root);

const styles = {
  container: {
    flex: 1
  }
};
