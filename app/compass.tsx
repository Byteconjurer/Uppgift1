import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button, PanResponder } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { MovingAverage } from '../utility/MovingAverage';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-paper';

export default function Compass() {
    const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
    const [progress, setProgress] = useState(0);
    const [calibrated, setCalibrated] = useState(90);
    const [currentAnimation, setCurrentAnimation] = useState(0); // Track current animation (0 or 1)
    const [animationSource, setAnimationSource] = useState(require('../assets/lottieCompass.json'));
    const isFocused = useIsFocused();
    const movingAvg = new MovingAverage(15);

    const lottieRef = useRef(null);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 20; // Detect horizontal swipes
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    // Swipe right - Switch to the alternate animation
                    setAnimationSource(require('../assets/lottieCompassAlt.json'));
                    setCurrentAnimation(1); // Indicate second animation is active
                } else if (gestureState.dx < 0) {
                    // Swipe left - Switch back to the original animation
                    setAnimationSource(require('../assets/lottieCompass.json'));
                    setCurrentAnimation(0); // Indicate first animation is active
                }
            },
        })
    ).current;

    useEffect(() => {
        if (isFocused) {
            Magnetometer.setUpdateInterval(30);
            const subscription = Magnetometer.addListener((data) => {
                setMagnetometerData(data);
            });

            return () => {
                subscription.remove();
                console.log('Unsubscribed from magnetometer');
            };
        }
    }, [isFocused]);

    useEffect(() => {
        const { x, y } = magnetometerData;
        let angle = Math.atan2(y, x) * (180 / Math.PI) - calibrated;

        if (angle < 0) {
            angle += 360;
        }

        const normalizedProgress = angle / 360;
        const smoothedProgress = Number(movingAvg.addValue(normalizedProgress).toFixed(2));
        setProgress(smoothedProgress);
        console.log(smoothedProgress);
    }, [magnetometerData]);

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
           
            <View style={styles.indicatorContainer}>
                <View style={[styles.dot, currentAnimation === 0 && styles.activeDot]} />
                <View style={[styles.dot, currentAnimation === 1 && styles.activeDot]} />
            </View>

            <LottieView
                ref={lottieRef}
                source={animationSource} // Dynamically changing the source
                progress={(1 - progress)}
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
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Position above the Lottie animation
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#333', // Change color for active indicator
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
    },
});