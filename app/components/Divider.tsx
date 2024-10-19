import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Colors from '../Colors.utils';

const Divider: FC<{ margin?: number }> = ({ margin = 5 }) => {
  return <View style={[styles.divider, { marginVertical: margin }]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.grey,
  },
});
