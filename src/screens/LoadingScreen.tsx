import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingScreen = ({ route, navigation }: any) => {
  const { text, type } = route.params;
  const [percentage, setPercentage] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (type === "word") {
      setLoadingText("Analisando palavra...");
    } else if (type === "phrase") {
      setLoadingText("Analisando frase...");
    } else {
      setLoadingText("Analisando texto...");
    }
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 2;

        if (newPercentage >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigation.navigate("Result", {
              text,
              type,
            });
          }, 500);
          return 100;
        }

        return newPercentage;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigation, text, type]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/learning.gif")}
          style={styles.loadingImage}
          resizeMode="contain"
        />

        <Text style={styles.loadingText}>{loadingText}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{percentage}%</Text>
        </View>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  loadingImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272729",
    marginBottom: 20,
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#F5F5F7",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ACBCB",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: "#272729",
  },
});
