import React, { Component } from 'react';
import { View, Image } from 'react-native';

class BackgroundImage extends Component {
  render() {
    return (
      <View style={style.imageWrapper}>
        <Image
          style={style.imageStyle}
          source={require('../../../img/bg-pink--gradient.png')}
        />
      </View>
    );
  }
}

let style = {
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  imageStyle: {
    flex: 1
  }
};

export { BackgroundImage };
