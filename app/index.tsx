import { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Index() {
  const animation1 = useRef<LottieView>(null);
  const animation2 = useRef<LottieView>(null);

  useEffect(() => {
    // Play both animations independently
    animation1.current?.play();
    animation2.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        loop
        ref={animation1}
        style={{
          width: 740,
          height: 740,
          position: 'absolute',
          left: -180,
          top: 25,
        }}
        source={require('../assets/lottieFireRing.json')}
      />
      <LottieView
        loop
        ref={animation2}
        style={{
          width: 350,
          height: 350,
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