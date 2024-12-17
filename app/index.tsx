import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Link, router } from 'expo-router';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from "../assets/colors/colors";

const lineGradient = require("../assets/images/Line Gradient.png");
const radialGradient = require("../assets/images/Radial Gradient.png");
const circles = require("../assets/images/circles.png");
const phoneMockup = require("../assets/images/mockup.png");
const fiveStars = require("../assets/images/stars.png");

const Index = () => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'PlusJakartaSans-ExtraBoldItalic': require('../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Image source={radialGradient} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10}} />
      <Image source={lineGradient} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 20}} />
      <Image source={circles} style={{position: "absolute", top: 40, right: 0, width: 400, height: 400, zIndex: 30}} />

      <View style={styles.greenBox}>
        <Text style={styles.boxText}>Trade AI Pro</Text>
      </View>
      
      <Text style={styles.title}>Unlimited Chart Scans</Text>
      <Image source={phoneMockup} style={{width: "30%", height: "30%", zIndex: 50, position: "relative", transform: [{ rotate: '-10.97deg' }], marginTop: 12, marginBottom: 22}} />
      <Text style={styles.subtitle}>Upload an image and get instant crypto, forex, and stock TA</Text>

      <View style={styles.greyBox}>
        <Text style={styles.userName}>Sunny K.</Text>
        <Text style={styles.testimonialText}>By far the best AI trading app, I made 10X what I paid for on my first trade</Text>
        <Image source={fiveStars} style={styles.starImage} />
      </View>

      <View style={styles.horizontalLine}>
        <Text style={styles.whiteText}>3-day free trial, then </Text>
        <Text style={styles.greenText}>$6.99/week</Text>
      </View>

      <Pressable onPress={() => router.push("/home")} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Continue</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </Pressable>

      <View style={styles.termsofUse}>
        <Link href="/home" style={styles.greyText}>Restore Purchases</Link>
        <Link href="/home" style={styles.greyText}>Terms of Use</Link>
        <Link href="/home" style={styles.greyText}>Privacy Policy</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 29,
    color: colors.white,
    position: "relative",
    zIndex: 60,
  },
  greenBox: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginBottom: 8,
    position: "relative",
    zIndex: 40,
  },
  boxText: {
    color: colors.green,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 14,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    width: 300,
  },
  greyBox: {
    backgroundColor: colors.darkGrey,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 34,
    marginHorizontal: 32,
    borderWidth: 1,
    borderColor: colors.stroke,
    height: 'auto',
  },
  userName: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
  testimonialText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 13,
    color: colors.white,
    marginTop: 11,
    textAlign: "center",
  },
  starImage: {
    width: 77,
    height: 11,
    alignSelf: "center",
    marginTop: 11,
    marginBottom: 5,
    position: "relative",
    zIndex: 60
  },
  horizontalLine: {
    flexDirection: "row",
    marginTop: 34,
  },
  whiteText: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 16,
    color: colors.white,
  },
  greenText: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 16,
    color: colors.green,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    borderRadius: 15,
    marginTop: 14,
    paddingHorizontal: 100,
    paddingVertical: 22,
    marginHorizontal: 35,
    flexDirection: "row",
    position: "relative",
    zIndex: 100
  },
  buttonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    paddingRight: 10,
    color: colors.black,
  },
  termsofUse: {
    flexDirection: "row",
    marginTop: 13,
    justifyContent: "space-between",
  },
  greyText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 12,
    paddingHorizontal: 14,
    color: colors.grey,
  },
});

export default Index;