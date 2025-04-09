import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AnalysisType = 'word' | 'phrase' | 'text';

export const HomeScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [selectedType, setSelectedType] = useState<AnalysisType>('word');
  const [wordCount, setWordCount] = useState(0);

  const getMaxWords = () => {
    switch (selectedType) {
      case 'word':
        return 1;
      case 'phrase':
        return 20;
      case 'text':
        return 100;
    }
  };

  const handleInputChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    setInput(text);
  };

  const isAnalyzeDisabled = () => {
    const maxWords = getMaxWords();
    return wordCount === 0 || wordCount > maxWords;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../../assets/font-size.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.label}>Digite uma frase</Text>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={handleInputChange}
          placeholder="Ex: Ovo, Ame o poema, Socorram-me subi no ônibus em Marrocos"
          placeholderTextColor="#D9D9D9"
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.wordCount}>
          {wordCount}/{getMaxWords()} palavras
        </Text>

        <Text style={styles.analysisLabel}>Analisar:</Text>

        <View style={styles.typeButtons}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === 'word' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('word')}
          >
            <Ionicons
              name="text"
              size={24}
              color={selectedType === 'word' ? '#FFF' : '#000'}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'word' && styles.selectedTypeButtonText,
              ]}
            >
              palavra
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === 'phrase' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('phrase')}
          >
            <Ionicons
              name="text"
              size={24}
              color={selectedType === 'phrase' ? '#FFF' : '#000'}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'phrase' && styles.selectedTypeButtonText,
              ]}
            >
              frase
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === 'text' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('text')}
          >
            <Ionicons
              name="document-text"
              size={24}
              color={selectedType === 'text' ? '#FFF' : '#000'}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'text' && styles.selectedTypeButtonText,
              ]}
            >
              texto
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.analyzeButton, isAnalyzeDisabled() && styles.disabledButton]}
          onPress={() =>
            navigation.navigate('Loading', {
              text: input,
              type: selectedType,
            })
          }
          disabled={isAnalyzeDisabled()}
        >
          <Text style={styles.analyzeButtonText}>Analisar</Text>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#272729',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    color: '#272729',
    fontSize: 16,
  },
  wordCount: {
    textAlign: 'right',
    marginTop: 5,
    color: '#272729',
  },
  analysisLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#272729',
    marginTop: 20,
    marginBottom: 10,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    backgroundColor: '#4ACBCB',
  },
  typeButtonText: {
    marginLeft: 5,
    color: '#000',
  },
  selectedTypeButtonText: {
    color: '#FFF',
  },
  analyzeButton: {
    backgroundColor: '#4ACBCB',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#D9D9D9',
  },
  analyzeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
}); 