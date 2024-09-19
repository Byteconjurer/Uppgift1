import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Compass() {
    const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
    const [progress, setProgress] = useState(0);
    const [calibrated, setCalibrated] = useState(90);

    const isFocused = useIsFocused(); // Detect if the screen is focused

    useEffect(() => {
        if (isFocused) {
            // Only subscribe when the screen is focused
            Magnetometer.setUpdateInterval(30);
            const subscription = Magnetometer.addListener((data) => {
                setMagnetometerData(data);
            });

            return () => {
                // Unsubscribe when the screen is not focused
                subscription.remove();
                console.log('Unsubscribed from magnetometer');
            };
        }
    }, [isFocused]);

    useEffect(() => {
        // Calculate the angle based on the magnetometer data
        const { x, y } = magnetometerData;
        let angle = Math.atan2(y, x) * (180 / Math.PI) - calibrated;

        // Normalize the angle to 0-360 degrees
        if (angle < 0) {
            angle += 360;
        }

        // Convert the angle to progress (0-1) for LottieView
        const normalizedProgress = angle / 360;
        setProgress(normalizedProgress);
    }, [magnetometerData]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/lottieCompass.json')}
                progress={Number((1 - progress).toFixed(2))}  // progress between 0 and 1
                style={styles.lottieStyle}
            />
            <Text style={styles.heading}>Calibrate</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 'auto' }}>
                <Button title="  -  " onPress={() => setCalibrated(calibrated - 5)} />
                <View style={{ padding: 20 }}></View>
                <Button title=" + " onPress={() => setCalibrated(calibrated + 5)} />
            </View>
            <Text style={styles.heading}>{calibrated}°</Text>
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
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: '#333',
    },
});