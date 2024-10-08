import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function Index() {
  const animation1 = useRef<LottieView>(null);
  const animation2 = useRef<LottieView>(null);
  const [showText, setShowText] = useState(false);
 
  setTimeout(() => { setShowText(true) }, 3000);

  useEffect(() => {
    // Play both animations independently
    animation1.current?.play();
    animation2.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      {showText && <Text style={{ fontSize: 34, fontWeight: 'bold', position: 'static', top: -270 }}>Häftigt!</Text>}
      <LottieView
        loop
        ref={animation1}
        style={{
          width: 740,
          height: 740,
          position: 'absolute',
          left: -180,
          top: 45,
        }}
        source={require('../assets/lottieFireRing.json')}
      />
      <LottieView
        loop
        ref={animation2}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          left: 55,
          top: 260,
        }}
        source={require('../assets/lottieHomeAnimation.json')}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});