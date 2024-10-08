import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {
  Button,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { Themes } from '../themes';
import { useTheme } from '../hooks/useTheme';

const customDarkTheme = { ...MD3DarkTheme, colors: Themes.dark };
const customLightTheme = { ...MD3LightTheme, colors: Themes.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedLightTheme = merge(LightTheme, customLightTheme);
const combinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function Layout() {
  const { toggleTheme, colorScheme } = useTheme();

  
  const paperTheme = colorScheme === 'dark' ? combinedDarkTheme : combinedLightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Drawer>
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Home',
                title: 'Hem',
                headerRight: () => (
                  <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                    Theme
                  </Button>
                ),
              }}
            />
            <Drawer.Screen
              name="camera"
              options={{
                drawerLabel: 'Camera',
                title: 'Kamera o sånt',
                headerRight: () => (
                  <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                    Theme
                  </Button>
                ),
              }}
            />
            <Drawer.Screen
              name="compass"
              options={{
                drawerLabel: 'Compass',
                title: 'Komp ass',
                headerRight: () => (
                  <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                    Theme
                  </Button>
                ),
              }}
            />
            <Drawer.Screen
              name="info"
              options={{
                drawerLabel: 'Device Info',
                title: 'Device Information',
                headerRight: () => (
                  <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                    Theme
                  </Button>
                ),
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
                headerRight: () => (
                  <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                    Theme
                  </Button>
                ),
              }}
            />
          </Drawer>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}