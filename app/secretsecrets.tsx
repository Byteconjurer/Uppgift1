import { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';

export default function App() {
  const video = useRef(null);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Function to show text when video is loading
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  // Function to hide text when video is ready
  const handleReadyForDisplay = () => {
    setIsLoading(false);
  };

  if (!isFocused) {
    return <View />;
  } else {
    return (
      <View style={styles.container}>
        {isLoading && (
          <Text style={styles.loadingText}>HL3 will release on...</Text> 
        )}
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
          }}
          resizeMode={ResizeMode.STRETCH}
          isLooping={true}
          shouldPlay={true}
          onLoadStart={handleLoadStart} 
          onReadyForDisplay={handleReadyForDisplay} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingText: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});