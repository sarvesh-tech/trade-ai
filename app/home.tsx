import { Text, View, StyleSheet, Pressable, Image, Alert } from "react-native";
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/colors/colors";

const lineGradient = require("../assets/images/Line Gradient.png");
const radialGradient = require("../assets/images/Radial Gradient.png");
const circles = require("../assets/images/circles.png");

const Index = () => {
  const showImageOptions = () => {
    Alert.alert(
      "Select Image",
      "Choose an option to select your chart image",
      [
        {
          text: "Take Photo",
          onPress: () => takePhoto(),
        },
        {
          text: "Choose from Library",
          onPress: () => pickImage(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera permission to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "/(app)/analysis",
        params: { imageUri: result.assets[0].uri }
      });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      try {
        const formData = new FormData();
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        formData.append('file', blob, 'chart.png');
        
        const uploadResponse = await fetch('http://127.0.0.1:8000/process-image/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }

        const data = await uploadResponse.json();

        router.push({
          pathname: "/(app)/analysis",
          params: { result: data }
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={radialGradient} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10}} />
      <Image source={lineGradient} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 20}} />
      <Image source={circles} style={{position: "absolute", top: -190, left: 190, transform: [{ rotate: '45deg' }], zIndex: 30}} />

      <View style={styles.logoBox}>
        <View style={styles.logoText}>
          <Text style={styles.whiteText}>Trade</Text>
          <Text style={styles.greenText}>AI</Text>
        </View> 
        <Text style={styles.subtitle}>Get technical analysis for trading charts in seconds</Text>
      </View>

      <Pressable onPress={showImageOptions} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Analyze Chart</Text>
        <FontAwesome name="picture-o" size={24} color="black" />
      </Pressable>  

      <Text style={styles.greyText}>Disclaimer: This is not financial advice. Always seek the advice of a licensed professional before investing</Text>
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
  logoBox: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 250,
    marginTop: 100,
    position: "relative",
    zIndex: 60,
  },
  logoText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  whiteText: {
    color: colors.white,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 64,
    paddingRight: 5,
    position: "relative",
    zIndex: 60,
  },
  greenText: {
    color: colors.green,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontSize: 64,
    paddingLeft: 5,
    position: "relative",
    zIndex: 60,
  },
  subtitle: {
    color: colors.white,
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 20,
    position: "relative",
    zIndex: 60,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: colors.green,
    borderRadius: 15,
    marginTop: 14,
    paddingHorizontal: 85,
    paddingVertical: 22,
    marginHorizontal: 35,
    flexDirection: "row",
    position: "relative",
    zIndex: 100
  },
  buttonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    paddingRight: 10,
  },
  greyText: {
    color: colors.grey,
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 12,
    position: "relative",
    zIndex: 60,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 16,
    width: '90%',
  },
});

export default Index;