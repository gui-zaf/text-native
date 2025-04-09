import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type AnalysisType = "word" | "phrase" | "text";

export const HomeScreen = ({ navigation }: any) => {
  const [input, setInput] = useState("");
  const [selectedType, setSelectedType] = useState<AnalysisType>("word");
  const [wordCount, setWordCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasShortWord, setHasShortWord] = useState(false);

  useEffect(() => {
    const words = input.trim().split(/\s+/);
    const newWordCount = input.trim() === "" ? 0 : words.length;
    setWordCount(newWordCount);

    const hasShortWord =
      selectedType === "word" &&
      words.some((word) => word.length > 0 && word.length < 2);
    setHasShortWord(hasShortWord);
  }, [input, selectedType]);

  const getMaxWords = () => {
    switch (selectedType) {
      case "word":
        return 1;
      case "phrase":
        return 20;
      case "text":
        return 100;
    }
  };

  const getMinWords = () => {
    switch (selectedType) {
      case "word":
        return 1;
      case "phrase":
        return 2;
      case "text":
        return 21;
    }
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case "word":
        return "Ex: Ovo, Radar, Arara";
      case "phrase":
        return "Ex: Ame o poema";
      case "text":
        return "Digite um texto para análise...";
    }
  };

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const isAnalyzeDisabled = () => {
    const maxWords = getMaxWords();
    const minWords = getMinWords();

    if (selectedType === "word") {
      return input.length === 0 || input.length < 2 || wordCount > 1;
    } else if (selectedType === "phrase") {
      return wordCount < minWords || wordCount > maxWords;
    } else {
      return wordCount < minWords || wordCount > maxWords;
    }
  };

  const handleSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (!isAnalyzeDisabled()) {
      Keyboard.dismiss();
      handleAnalyze();
    }
  };

  const handleAnalyze = () => {
    if (isAnalyzeDisabled()) return;

    if (Platform.OS === "android") {
      setIsAnalyzing(true);

      setTimeout(() => {
        setIsAnalyzing(false);
        navigation.navigate("Result", {
          text: input,
          type: selectedType,
        });
      }, 1000);
    } else {
      navigation.navigate("Loading", {
        text: input,
        type: selectedType,
      });
    }
  };

  const getWordCountText = () => {
    if (hasShortWord) {
      return "Palavra deve ter pelo menos 2 letras";
    }

    if (selectedType === "word") {
      if (input.length === 0) {
        return "0/1 palavra";
      } else if (input.length < 2) {
        return "Palavra deve ter pelo menos 2 letras";
      } else if (wordCount > 1) {
        return "Máximo de 1 palavra permitido";
      } else {
        return "1/1 palavra";
      }
    } else if (selectedType === "phrase") {
      const minWords = 2;
      const maxWords = getMaxWords();
      if (wordCount === 0) {
        return `0/${maxWords} palavras (mínimo ${minWords})`;
      } else if (wordCount < minWords) {
        return `${wordCount}/${maxWords} palavras (mínimo ${minWords})`;
      }
      return `${wordCount}/${maxWords} palavras`;
    } else {
      const minWords = 21;
      const maxWords = getMaxWords();
      if (wordCount === 0) {
        return `0/${maxWords} palavras (mínimo ${minWords})`;
      } else if (wordCount < minWords) {
        return `${wordCount}/${maxWords} palavras (mínimo ${minWords})`;
      }
      return `${wordCount}/${maxWords} palavras`;
    }
  };

  const isError = () => {
    if (hasShortWord) return true;

    if (selectedType === "word") {
      return input.length === 0 || input.length < 2 || wordCount > 1;
    } else if (selectedType === "phrase") {
      const minWords = 2;
      return wordCount < minWords || wordCount > getMaxWords();
    } else {
      const minWords = 21;
      return wordCount < minWords || wordCount > getMaxWords();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Image
              source={require("../../assets/font-size.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.label}>Digite algo</Text>

            <TextInput
              style={styles.input}
              value={input}
              onChangeText={handleInputChange}
              placeholder={getPlaceholder()}
              placeholderTextColor="#D9D9D9"
              multiline={true}
              textAlignVertical="top"
              textAlign="left"
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="go"
            />

            <Text style={[styles.wordCount, isError() && styles.errorText]}>
              {getWordCountText()}
            </Text>

            <Text style={styles.analysisLabel}>Analisar</Text>

            <View style={styles.typeButtons}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === "word" && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType("word")}
              >
                <Ionicons
                  name="text"
                  size={24}
                  color={selectedType === "word" ? "#FFF" : "#000"}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === "word" && styles.selectedTypeButtonText,
                  ]}
                >
                  Palavra
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === "phrase" && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType("phrase")}
              >
                <Ionicons
                  name="text"
                  size={24}
                  color={selectedType === "phrase" ? "#FFF" : "#000"}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === "phrase" && styles.selectedTypeButtonText,
                  ]}
                >
                  Frase
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === "text" && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType("text")}
              >
                <Ionicons
                  name="document-text"
                  size={24}
                  color={selectedType === "text" ? "#FFF" : "#000"}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === "text" && styles.selectedTypeButtonText,
                  ]}
                >
                  Texto
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.analyzeButton,
                isAnalyzeDisabled() && styles.disabledButton,
              ]}
              onPress={handleAnalyze}
              disabled={isAnalyzeDisabled() || isAnalyzing}
            >
              {isAnalyzing ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Text style={styles.analyzeButtonText}>Analisar</Text>
                  <Ionicons name="arrow-forward" size={24} color="#FFF" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#272729",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
    padding: 15,
    color: "#272729",
    fontSize: 16,
    minHeight: 40,
    maxHeight: 200,
  },
  wordCount: {
    textAlign: "right",
    marginTop: 5,
    color: "#272729",
  },
  errorText: {
    color: "#F44444",
  },
  analysisLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#272729",
    marginTop: 20,
    marginBottom: 10,
  },
  typeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#272729",
  },
  typeButtonText: {
    marginLeft: 5,
    color: "#000",
  },
  selectedTypeButtonText: {
    color: "#FFF",
  },
  analyzeButton: {
    backgroundColor: "#4ACBCB",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#D9D9D9",
  },
  analyzeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});
