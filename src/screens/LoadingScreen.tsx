import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';

export const LoadingScreen = ({ route, navigation }: any) => {
  const { text, type } = route.params;
  const [progress] = useState(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  const getLoadingTime = () => {
    switch (type) {
      case 'word':
        return 2000;
      case 'phrase':
        return 4000;
      case 'text':
        return 8000;
      default:
        return 2000;
    }
  };

  const getTypeText = () => {
    switch (type) {
      case 'word':
        return 'palavra';
      case 'phrase':
        return 'frase';
      case 'text':
        return 'texto';
      default:
        return 'texto';
    }
  };

  useEffect(() => {
    const duration = getLoadingTime();
    const interval = 50; // Update percentage every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentStep = 0;
    const percentageInterval = setInterval(() => {
      currentStep++;
      setPercentage(Math.min(Math.round(currentStep * increment), 100));
    }, interval);

    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      clearInterval(percentageInterval);
      navigation.replace('Result', { text, type });
    });

    return () => clearInterval(percentageInterval);
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/learning.gif')}
        style={styles.gif}
        resizeMode="contain"
      />
      <Text style={styles.percentage}>{percentage}%</Text>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width,
            },
          ]}
        />
      </View>
      <Text style={styles.loadingText}>
        Analisando o {getTypeText()}...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#272729',
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ACBCB',
    borderRadius: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#272729',
  },
}); 