import React, { Component } from 'react';
import { View } from 'react-native';

import Router from '../Router';

export default class Landing extends Component {
  render() {
    return <Router style={styles.container} />;
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
