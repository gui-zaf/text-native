import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const isPalindrome = (str: string) => {
  const normalizedStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const cleanStr = normalizedStr.replace(/[^a-z0-9]/g, "");

  return cleanStr === cleanStr.split("").reverse().join("");
};

const countVowels = (text: string) => {
  // Remove accents and convert to lowercase
  const normalizedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Count vowels (a, e, i, o, u)
  return (normalizedText.match(/[aeiou]/g) || []).length;
};

const countConsonants = (text: string) => {
  // Remove accents and convert to lowercase
  const normalizedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Count consonants (any letter that's not a vowel)
  return (normalizedText.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
};

const countPalindromes = (text: string) => {
  if (isPalindrome(text)) {
    return 1;
  }

  const words = text.split(/\s+/);
  let count = 0;

  words.forEach((word) => {
    if (isPalindrome(word)) {
      count++;
    }
  });

  return count;
};

const countVowelsAndConsonants = (text: string) => {
  const normalizedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const vowels = normalizedText.match(/[aeiou]/g) || [];
  const consonants = normalizedText.match(/[bcdfghjklmnpqrstvwxyz]/g) || [];

  return {
    vowels: vowels.length,
    consonants: consonants.length,
  };
};

export const ResultScreen = ({ route, navigation }: any) => {
  const { text, type } = route.params;
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [highlightType, setHighlightType] = useState<
    "vowels" | "consonants" | "palindrome" | null
  >(null);

  const getStatisticsText = () => {
    const vowelCount = countVowels(text);
    const consonantCount = countConsonants(text);
    const isPalindromic = isPalindrome(text);

    const vowelText = vowelCount === 1 ? "vogal" : "vogais";
    const consonantText = consonantCount === 1 ? "consoante" : "consoantes";

    let statsText = `Sua ${getTypeText().toLowerCase()} tem ${vowelCount} ${vowelText}, ${consonantCount} ${consonantText}`;

    if (isPalindromic) {
      statsText += " e é um palíndromo";
    }

    return statsText;
  };

  const getTypeText = () => {
    switch (type) {
      case "word":
        return "Palavra";
      case "phrase":
        return "Frase";
      case "text":
        return "Texto";
      default:
        return "";
    }
  };

  const getFontSize = () => {
    switch (type) {
      case "word":
        return 30;
      case "phrase":
        return 24;
      case "text":
        return 18;
      default:
        return 18;
    }
  };

  const highlightVowels = (text: string) => {
    return text.split("").map((char, index) => {
      if (/[aeiouáàâãéèêíìîóòôõúùû]/i.test(char)) {
        return (
          <Text key={index} style={styles.highlightedText}>
            {char}
          </Text>
        );
      }
      return <Text key={index}>{char}</Text>;
    });
  };

  const highlightConsonants = (text: string) => {
    return text.split("").map((char, index) => {
      if (/[bcdfghjklmnpqrstvwxyz]/i.test(char)) {
        return (
          <Text key={index} style={styles.highlightedText}>
            {char}
          </Text>
        );
      }
      return <Text key={index}>{char}</Text>;
    });
  };

  const highlightPalindromes = (text: string) => {
    if (isPalindrome(text)) {
      return <Text style={styles.highlightedText}>{text}</Text>;
    }

    const words = text.split(/\s+/);
    const result = words.map((word, index) => {
      if (isPalindrome(word)) {
        return (
          <Text key={index} style={styles.highlightedText}>
            {word}{" "}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.nonPalindromeText}>
          {word}{" "}
        </Text>
      );
    });

    return result;
  };

  const renderHighlightedText = () => {
    switch (highlightType) {
      case "vowels":
        return highlightVowels(text);
      case "consonants":
        return highlightConsonants(text);
      case "palindrome":
        return highlightPalindromes(text);
      default:
        return text;
    }
  };

  const getStatsText = () => {
    const vowelCount = countVowels(text);
    const consonantCount = countConsonants(text);
    const isPalindromic = isPalindrome(text);

    const vowelText = vowelCount === 1 ? "vogal" : "vogais";
    const consonantText = consonantCount === 1 ? "consoante" : "consoantes";

    let statsText = `Sua ${getTypeText().toLowerCase()} tem ${vowelCount} ${vowelText}, ${consonantCount} ${consonantText}`;

    if (isPalindromic) {
      statsText += " e é um palíndromo";
    }

    return statsText;
  };

  const handleHighlight = (type: "vowels" | "consonants" | "palindrome") => {
    if (highlightType === type) {
      setHighlightType(null);
      setIsHighlighted(false);
    } else {
      setHighlightType(type);
      setIsHighlighted(true);
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
            <Text style={styles.typeLabel}>{getTypeText()}</Text>

            <View style={styles.textContainer}>
              <Text style={[styles.displayText, { fontSize: getFontSize() }]}>
                {renderHighlightedText()}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.analysisContainer}>
              <Text style={styles.analysisTitle}>Análise</Text>
              <Text style={styles.analysisText}>{getStatisticsText()}</Text>
            </View>

            <View style={styles.separator} />

            <Text style={styles.highlightLabel}>Destacar</Text>

            <View style={styles.typeButtons}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  highlightType === "consonants" && styles.selectedTypeButton,
                ]}
                onPress={() => handleHighlight("consonants")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    highlightType === "consonants" &&
                      styles.selectedTypeButtonText,
                  ]}
                >
                  Consoante
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  highlightType === "vowels" && styles.selectedTypeButton,
                ]}
                onPress={() => handleHighlight("vowels")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    highlightType === "vowels" && styles.selectedTypeButtonText,
                  ]}
                >
                  Vogal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  highlightType === "palindrome" && styles.selectedTypeButton,
                ]}
                onPress={() => handleHighlight("palindrome")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    highlightType === "palindrome" &&
                      styles.selectedTypeButtonText,
                  ]}
                >
                  Palíndromo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.newAnalysisButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.newAnalysisButtonText}>Nova Análise</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
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
  typeLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#272729",
    textAlign: "center",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  displayText: {
    color: "#272729",
    textAlign: "center",
    fontWeight: "bold",
  },
  separator: {
    height: 2,
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginVertical: 20,
  },
  analysisContainer: {
    marginBottom: 20,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272729",
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    color: "#272729",
    lineHeight: 24,
  },
  highlightLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272729",
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
    padding: 10,
    marginHorizontal: 5,
    height: 50,
  },
  selectedTypeButton: {
    backgroundColor: "#272729",
  },
  typeButtonText: {
    color: "#000",
  },
  selectedTypeButtonText: {
    color: "#FFF",
  },
  highlightedText: {
    color: "#4ACBCB",
    fontWeight: "bold",
  },
  nonPalindromeText: {
    color: "#F44444",
  },
  newAnalysisButton: {
    backgroundColor: "#4ACBCB",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newAnalysisButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});
