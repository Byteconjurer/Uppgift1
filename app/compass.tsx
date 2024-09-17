import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import LottieView from 'lottie-react-native';

export default function Compass() {
    const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        Magnetometer.setUpdateInterval(1000);
        const subscription = Magnetometer.addListener((data) => {
            setMagnetometerData(data);
        });

        return () => {
            // Unsubscribe to avoid memory leaks
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        // Calculate the angle based on the magnetometer data
        const { x, y } = magnetometerData;
        let angle = Math.atan2(y, x) * (180 / Math.PI);

        // Normalize the angle to 0-360 degrees
        if (angle < 0) {
            angle += 360;
        }

        // Convert the angle to progress (0-1) for LottieView
        const normalizedProgress = angle / 360;
        setProgress(normalizedProgress);
    }, [magnetometerData]);

    console.log(progress);
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/lottieCompass.json')}
                progress={1-progress}  // progress between 0 and 1
                style={styles.lottieStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieStyle: {
        width: 400,
        height: 400,
    },
});