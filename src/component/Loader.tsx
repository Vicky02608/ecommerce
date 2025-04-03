import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CenterLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: Light background overlay
  },
});

export default CenterLoader;
