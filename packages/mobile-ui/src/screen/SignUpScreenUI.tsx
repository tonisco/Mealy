import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { useForm } from "react-hook-form"
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
import { z } from "zod"

import { moveToTop } from "../animation"
import { UseSignUpState } from "../context/SignUpStore"
import { AuthScreenType } from "../screenTypes/default"
import { GradientButton, GradientText, Input } from "../ui"
import { Colors, IsIos, TextSize } from "../utils"

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up"> & {
  logoText: string
  logoImageSource: ImageSourcePropType
  googleImageSource: ImageSourcePropType
  createAccount: ({ email, password }: FormData) => void
}

const SignUpScreenUI = ({
  navigation,
  logoText,
  logoImageSource,
  googleImageSource,
  createAccount,
}: Props) => {
  const { navigate } = navigation

  const { signUpState } = UseSignUpState()

  const schema = z
    .object({
      email: z
        .string()
        .trim()
        .email()
        .refine((val) => val.toLocaleLowerCase()),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpState,
    resolver: zodResolver(schema),
  })

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
            entering={moveToTop}
          />
          <Animated.View entering={FadeIn.duration(800).delay(800)}>
            <GradientText style={styles.logoText} text={logoText} />
          </Animated.View>
        </View>
        <View style={styles.details}>
          <Animated.Text
            entering={ZoomIn.duration(500).delay(1500)}
            style={styles.heading}
          >
            Sign up for Free
          </Animated.Text>
          <Animated.View
            style={styles.form}
            entering={ZoomIn.duration(500).delay(1500)}
          >
            <Input
              control={control}
              error={errors.email?.message}
              inputName="email"
              check={true}
              placeholder="Email"
              iconName={IsIos ? "ios-mail" : "mail"}
            />
            <Input
              control={control}
              check={true}
              error={errors.password?.message}
              inputName="password"
              placeholder="Password"
              iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
              encrypt
            />
            <Input
              control={control}
              check={true}
              error={errors.confirmPassword?.message}
              inputName="confirmPassword"
              placeholder="Confirm Password"
              iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
              encrypt
            />
          </Animated.View>
          <Animated.View
            style={styles.buttonContainer}
            entering={BounceInDown.duration(800).delay(1900)}
          >
            <GradientButton
              text="Create Account"
              onPress={handleSubmit(createAccount)}
            />
          </Animated.View>

          <Animated.View
            style={styles.other}
            entering={ZoomIn.duration(800).delay(2600)}
          >
            <Text style={styles.continueText}>Or Continue With</Text>
            <View style={styles.googleContainer}>
              <Image
                source={googleImageSource}
                style={styles.googleImage}
                resizeMode="contain"
              />
              <Text style={styles.googleText}>Google</Text>
            </View>
            <Pressable
              style={styles.optionsContainer}
              onPress={() => navigate("Log In")}
            >
              <GradientText
                style={styles.accountText}
                text="Already have an account? Login"
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
    zIndex: 1,
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
    fontSize: TextSize.regular,
    marginHorizontal: 5,
  },
  accountText: {
    fontSize: TextSize.small,
    fontFamily: "font-bold",
    textTransform: "capitalize",
  },
})

export default SignUpScreenUI
