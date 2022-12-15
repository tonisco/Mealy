import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "mobile-constants/src/Colors"
import TextSize from "mobile-constants/src/TextSize"
import { GradientButton, GradientText } from "mobile-ui"
import React from "react"
import { View, Text, StyleSheet, Image, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignUpScreen = () => {
  const createAccount = () => {
    console.log("clicked")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/images/Asset2.png")}
        />
        <GradientText style={styles.logoText} text="Mealy Food" />
      </View>
      <View style={styles.details}>
        <Text style={styles.heading}>Sign up for Free</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Email" />
            <Ionicons name="mail" style={styles.icon} size={20} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Password" />
            <Ionicons name="lock-closed" style={styles.icon} size={20} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Confirm Password" />
            <Ionicons name="lock-closed" style={styles.icon} size={20} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton text="Create Account" onPress={createAccount} />
        </View>

        <View style={styles.other}>
          <Text style={styles.continueText}>Or Continue With</Text>
          <View style={styles.googleContainer}>
            <Image
              source={require("../../../assets/images/google.png")}
              style={styles.googleImage}
            />
            <Text style={styles.googleText}>Google</Text>
          </View>
          <View style={styles.optionsContainer}>
            <GradientText
              style={styles.accountText}
              text="Already have an account? Login"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 84,
    marginBottom: 10,
  },
  logoText: {
    fontSize: TextSize.large,
    textTransform: "uppercase",
  },
  details: {
    marginTop: 15,
    alignItems: "center",
  },
  heading: {
    fontFamily: "font-bold",
    fontSize: TextSize.medium,
    textTransform: "uppercase",
    marginVertical: 5,
    color: Colors.dark,
  },
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 50,
    width: 300,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 50,
    paddingRight: 20,
    fontFamily: "font-medium",
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    top: 24,
    left: 20,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  other: {
    marginVertical: 10,
  },
  continueText: {
    fontSize: TextSize.tiny,
    fontFamily: "font-bold",
    marginVertical: 10,
    textTransform: "capitalize",
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    width: 240,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    elevation: 3,
  },
  googleImage: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  googleText: {
    fontFamily: "font-medium",
    fontSize: TextSize.small,
    marginHorizontal: 5,
  },
  accountText: {
    fontSize: TextSize.tiny,
    textTransform: "capitalize",
  },
})

export default SignUpScreen
