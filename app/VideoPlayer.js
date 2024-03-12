import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer({ uri }) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});
