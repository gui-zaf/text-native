import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isPalindrome = (str: string) => {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
};

const highlightPalindromes = (text: string) => {
  const words = text.split(/\s+/);
  const result = words.map((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (isPalindrome(cleanWord)) {
      return (
        <Text key={index} style={styles.highlightedText}>
          {word}{' '}
        </Text>
      );
    }
    return <Text key={index}>{word} </Text>;
  });

  // Check if the entire text is a palindrome
  if (isPalindrome(text)) {
    return (
      <Text style={styles.highlightedText}>
        {text}
      </Text>
    );
  }

  return result;
};

const countVowelsAndConsonants = (text: string) => {
  const vowels = text.match(/[aeiouáàâãéèêíìîóòôõúùû]/gi) || [];
  const consonants = text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
  return {
    vowels: vowels.length,
    consonants: consonants.length,
  };
};

export const ResultScreen = ({ route, navigation }: any) => {
  const { text } = route.params;
  const { vowels, consonants } = countVowelsAndConsonants(text);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/book.gif')}
        style={styles.gif}
        resizeMode="contain"
      />

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          value={text}
          editable={false}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Consoantes: {consonants}</Text>
          <Text style={styles.statsText}>Vogais: {vowels}</Text>
        </View>

        <View style={styles.analysisContainer}>
          <Text style={styles.analysisLabel}>Análise:</Text>
          <Text style={styles.analysisText}>
            {highlightPalindromes(text)}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.newAnalysisButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.newAnalysisButtonText}>Nova Análise</Text>
        <Ionicons name="arrow-forward" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  gif: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    color: '#272729',
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    color: '#272729',
    marginBottom: 5,
  },
  analysisContainer: {
    marginBottom: 20,
  },
  analysisLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#272729',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    color: '#272729',
    lineHeight: 24,
  },
  highlightedText: {
    color: '#4ACBCB',
    fontWeight: 'bold',
  },
  newAnalysisButton: {
    backgroundColor: '#4ACBCB',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  newAnalysisButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
}); 