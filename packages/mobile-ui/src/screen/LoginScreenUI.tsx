import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { Dispatch } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ImageSourcePropType,
} from "react-native"
import Animated, { BounceInDown, FadeIn, ZoomIn } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import { moveToTop } from "../animation"
import { AuthScreenType } from "../screenTypes/default"
import { GradientButton, GradientText, Input } from "../ui"
import { Colors, IsIos, TextSize } from "../utils"

type Props = NativeStackScreenProps<AuthScreenType, "Log In"> & {
  email: string
  changeEmail: Dispatch<React.SetStateAction<string>>
  password: string
  changePassword: Dispatch<React.SetStateAction<string>>
  logoText: string
  loginAccount: () => void
  logoImageSource: ImageSourcePropType
  googleImageSource: ImageSourcePropType
}

const LoginScreenUI = ({
  navigation,
  email,
  changeEmail,
  password,
  changePassword,
  logoText,
  loginAccount,
  googleImageSource,
  logoImageSource,
  route,
}: Props) => {
  const { navigate } = navigation

  const { params } = route

  const animate = params?.animation !== false
  console.log(animate)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Animated.Image
            style={styles.logoImage}
            source={logoImageSource}
            resizeMode="contain"
            entering={animate ? moveToTop : undefined}
          />
          <Animated.View
            entering={animate ? FadeIn.duration(800).delay(800) : undefined}
          >
            <GradientText style={styles.logoText} text={logoText} />
          </Animated.View>
        </View>
        <View style={styles.details}>
          <Animated.Text
            entering={animate ? ZoomIn.duration(500).delay(1500) : undefined}
            style={styles.heading}
          >
            Login to your account
          </Animated.Text>
          <Animated.View
            entering={animate ? ZoomIn.duration(500).delay(1500) : undefined}
            style={styles.form}
          >
            <Input
              placeholder="Email"
              iconName={IsIos ? "ios-mail" : "mail"}
              check={false}
              value={email}
              changeText={changeEmail}
            />
            <Input
              placeholder="Password"
              iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
              encrypt
              check={false}
              value={password}
              changeText={changePassword}
            />
          </Animated.View>
          <Animated.View
            style={styles.buttonContainer}
            entering={
              animate ? BounceInDown.duration(800).delay(1900) : undefined
            }
          >
            <GradientButton text="Login" onPress={loginAccount} />
          </Animated.View>

          <Animated.View
            entering={animate ? ZoomIn.duration(800).delay(2600) : undefined}
            style={styles.other}
          >
            <Text style={styles.continueText}>Or Login With</Text>
            <View style={styles.googleContainer}>
              <Image source={googleImageSource} style={styles.googleImage} />
              <Text style={styles.googleText}>Google</Text>
            </View>
            <Pressable
              style={styles.optionsContainer}
              onPress={() => navigate("Reset Password")}
            >
              <GradientText style={styles.accountText} text="Forgot Password" />
            </Pressable>
            <Pressable
              style={styles.optionsContainer}
              onPress={() => navigate("Sign Up", { animation: false })}
            >
              <GradientText
                style={styles.accountText}
                text="Don't have an account? Sign Up"
              />
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: TextSize.x_large,
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
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  other: {
    marginVertical: 10,
  },
  continueText: {
    fontSize: TextSize.small,
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
    fontSize: TextSize.regular,
    marginHorizontal: 5,
  },
  accountText: {
    fontSize: TextSize.small,
    textTransform: "capitalize",
  },
})

export default LoginScreenUI
