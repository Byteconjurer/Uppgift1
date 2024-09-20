import { Text, StyleSheet, ImageBackground } from 'react-native';
import * as Device from 'expo-device';

const image = require('../assets/fire-flame.png');

export default function DeviceInfo() {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>
        {Device.manufacturer}: {Device.modelName}
      </Text>
      <Text style={styles.text}>
        {Device.osName} version {Device.osVersion}
      </Text>
      <Text style={styles.text}>
        API Level: {Device.platformApiLevel}
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});