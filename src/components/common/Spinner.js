import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View>
      <ActivityIndicator color="#B2FF59" size={size || 'large'} />
    </View>
  );
};

export { Spinner };
