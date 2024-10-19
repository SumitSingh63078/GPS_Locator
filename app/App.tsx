import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from './Colors.utils';
import GeoList from './components/GeoList';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.grey} barStyle="dark-content" />
      <View style={styles.header} />
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>Coordinates</Text>
      </View>
      <GeoList />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: Colors.primary,
  },
  coordinatesContainer: {
    backgroundColor: Colors.grey,
    padding: 10,
  },
  coordinatesText: {
    color: Colors.black,
    fontSize: 16,
  },
});
