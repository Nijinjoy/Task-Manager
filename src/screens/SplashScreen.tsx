import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { logo } from '../assets/images';

const appName = 'Schedura';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);

  const lettersOpacity = appName.split('').map(() => useSharedValue(0));
  const lettersTranslateY = appName.split('').map(() => useSharedValue(20));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });

    logoScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      appName.split('').forEach((_, index) => {
        setTimeout(() => {
          lettersOpacity[index].value = withTiming(1, {
            duration: 400,
            easing: Easing.out(Easing.ease),
          });
          lettersTranslateY[index].value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
          });
        }, index * 80);
      });
    }, 400);

    const totalAnimationTime =
      400 +
      appName.length * 80 + 
      400 + 
      500;

    const timer = setTimeout(() => {
      // Navigate to Register screen inside Auth stack
      navigation.replace('Auth', { screen: 'Register' });
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>

      <View style={styles.textContainer}>
        <View style={styles.letterRow}>
          {appName.split('').map((letter, index) => {
            const animatedStyle = useAnimatedStyle(() => ({
              opacity: lettersOpacity[index].value,
              transform: [{ translateY: lettersTranslateY[index].value }],
            }));

            return (
              <Animated.Text key={index} style={[styles.title, animatedStyle]}>
                {letter}
              </Animated.Text>
            );
          })}
        </View>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  letterRow: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
