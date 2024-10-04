import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

export default function Joke() {
    const [joke, setJoke] = useState('Loading...');
    const [confetti, setConfetti] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const jokeUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist&format=txt';

    const fetchJoke = async () => {
        setJoke('');
        setConfetti(false);
        await fetch(jokeUrl)
            .then(response => response.text())
            .then(jokeText => {
                setJoke(jokeText);
                setConfetti(true); // Trigger confetti
                playSound();       // Play the sound after confetti
            })
            .catch(error => {
                setJoke('Error: ' + error);
            });
    };

    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/badumtss.mp3')
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.log('Error playing sound', error);
        }
    };

    useEffect(() => {
        fetchJoke();

        // Cleanup sound when the component unmounts
        return () => {
            if (sound) {
                sound.unloadAsync();
                console.log('Unloaded sound');
            }
        };
    }, []);

    return (
        <>
            {confetti && (
                <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut />
            )}
            <LottieView
                source={require('../assets/lottieJokeBg.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
            <View style={styles.container}>
                <Text style={styles.jokeText}>{joke}</Text>
            </View>
            <View style={{ padding: 30 }}>
                <Button onPress={fetchJoke} title="Get a Joke" color="#ff956b" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    jokeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 30,
    },
    lottie: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        top: '-28%',
        left: '-25%',
    },
});