import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import colors from "../../assets/colors/colors";

const lineGradient = require("../../assets/images/Line Gradient.png");
const radialGradient = require("../../assets/images/Radial Gradient.png");
const circles = require("../../assets/images/circles.png");

import { RouteProp } from '@react-navigation/native';
type AnalysisRouteProp = RouteProp<{ params: { result: JSON } }, 'params'>;

const Analysis = ({ route }: { route: AnalysisRouteProp }) => {
  const { result } = route.params; 

  return (
    <View style={styles.container}>
      <Image source={radialGradient} style={styles.backgroundImage} />
      <Image source={lineGradient} style={styles.backgroundImage} />

      <View style={styles.contentContainer}>
        {result && (
          <View style={styles.analysisContainer}>
            <Text style={styles.analysisText}>{JSON.stringify(result)}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    zIndex: 60,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginTop: 50,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 84,
    paddingVertical: 22,
    marginHorizontal: 35,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
  },
  analysisContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  analysisText: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 16,
    color: colors.white,
  },
});

export default Analysis; 