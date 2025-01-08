import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import colors from "../../assets/colors/colors";

const lineGradient = require("../../assets/images/Line Gradient.png");
const radialGradient = require("../../assets/images/Radial Gradient.png");
const circles = require("../../assets/images/circles.png");

const Analysis = () => {
  const { result, imageUri } = useLocalSearchParams();

  // Ensure `result` is a string before parsing
  const resultString = Array.isArray(result) ? result[0] : result;
  const parsedResult = resultString ? JSON.parse(resultString) : null;

  return (
    <View style={styles.container}>

      <View style={styles.contentContainer}>
        {/* Display the uploaded image */}
        {imageUri && (
          <Image
            source={{ uri: imageUri as string }} // Cast to string to avoid TypeScript errors
            style={styles.selectedImage}
          />
        )}

        {/* Rounded box with "Very Bullish" text and a circle */}
        <View style={styles.bullishContainer}>
          <View style={styles.bullishContent}>
            <Text style={styles.bullishTitle}>Very Bullish</Text>
            <Text style={styles.bullishDescription}>
              This stock seems to have a lot of upside, it is recommended to take a long position
            </Text>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>89%</Text>
          </View>
        </View>

        {/* Display the analysis result */}
        {parsedResult && (
          <View style={styles.analysisContainer}>
            <Text style={styles.analysisText}>Image ID: {parsedResult.image_id}</Text>
            <Text style={styles.analysisText}>Width: {parsedResult.width}</Text>
            <Text style={styles.analysisText}>Height: {parsedResult.height}</Text>
            <Text style={styles.analysisText}>Message: {parsedResult.message}</Text>
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
    marginBottom: 20, // Add some spacing below the image
  },
  bullishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 2,
    borderColor: colors.stroke,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  bullishContent: {
    flex: 1,
    marginRight: 15,
  },
  bullishTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: colors.green,
    marginBottom: 8,
  },

  bullishDescription: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 12,
    color: colors.white,
  },
  percentageContainer: {
    width: 84,
    height: 84,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: colors.green, // semi-transparent green
  },
  percentageText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 24,
    color: colors.white,
  },
  analysisContainer: {
    borderRadius: 15,
    padding: 20,
    width: '100%',
  },
  analysisText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 12,
    color: colors.white,
  },
});

export default Analysis;