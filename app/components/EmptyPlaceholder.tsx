import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../Colors.utils';

const EmptyPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require("../assets/welcome-cloud.png")} />
        <Text style={styles.title}>Welcome to GPS Store</Text>
        <Text style={styles.subtitle}>Your GPS store is empty</Text>
      </View>
    </View>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '400',
    fontSize: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.text_muted,
  },
});
