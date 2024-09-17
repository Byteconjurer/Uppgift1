import { useRef, useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Index() {
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  const image = require('../assets/fire-flame.png');
  return (

    <View style={styles.animationContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <LottieView
        loop
        ref={animation}
        style={{
          width: 370,
          height: 370,
        }}
        source={require('../assets/lottieHomeAnimation.json')}
      />
    </ImageBackground>
    </View >
  
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
  },
});