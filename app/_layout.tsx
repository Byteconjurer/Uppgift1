import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Hem',
          }}
        />
        <Drawer.Screen
          name="camera"
          options={{
            drawerLabel: 'Camera',
            title: 'Kamera o sånt',
          }}
        />
        <Drawer.Screen
          name="compass"
          options={{
            drawerLabel: 'Compass',
            title: 'Come pass',
          }}
        />
        <Drawer.Screen
          name="info"
          options={{
            drawerLabel: 'Device Info',
            title: 'Device Information',
          }}
        />
        <Drawer.Screen
          name="secretsecrets"
          options={{
            drawerLabel: 'Half Life 3 Release Date',
            title: 'Congratulations! Easter Egg!',
          }}
        />
        <Drawer.Screen
          name="joke"
          options={{
            drawerLabel: 'A Random Joke',
            title: 'Haahaahaaha1!!1!',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}