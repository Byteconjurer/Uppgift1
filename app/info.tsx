import { Text, View } from 'react-native';
import * as Device from 'expo-device';

export default function DeviceInfo() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {Device.manufacturer}: {Device.modelName}
      </Text>
        <Text>
            {Device.osName} version {Device.osVersion}
        </Text>
        <Text>
            API Level: {Device.platformApiLevel}
        </Text>

    </View>
  );
}