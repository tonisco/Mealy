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
import { IsIos, TextSize } from "../utils"

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

  // TODO: add react hook form

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-10 items-center">
          <Animated.Image
            className="mb-3 h-[84px] w-52"
            source={logoImageSource}
            resizeMode="contain"
            entering={animate ? moveToTop : undefined}
          />
          <Animated.View
            entering={animate ? FadeIn.duration(800).delay(800) : undefined}
          >
            <GradientText className="text-4xl uppercase" text={logoText} />
          </Animated.View>
        </View>

        <View className="mt4 items-center">
          <Animated.Text
            entering={animate ? ZoomIn.duration(500).delay(1500) : undefined}
            className="my-1 font-bento-bold text-xl uppercase text-dark"
          >
            Login to your account
          </Animated.Text>
          <Animated.View
            entering={animate ? ZoomIn.duration(500).delay(1500) : undefined}
            className="my-5"
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
            className="mt-4 mb-3"
            entering={
              animate ? BounceInDown.duration(800).delay(1900) : undefined
            }
          >
            <GradientButton text="Login" onPress={loginAccount} />
          </Animated.View>

          <Animated.View
            entering={animate ? ZoomIn.duration(800).delay(2600) : undefined}
            className="my-3"
          >
            <Text className="my-3 text-center font-bento-bold text-xs capitalize">
              Or Login With
            </Text>

            <View className="my-3 w-60 flex-row items-center justify-center gap-x-2 rounded-lg bg-white p-3 shadow shadow-black">
              <Image source={googleImageSource} className=" h-7 w-7" />
              <Text className=" font-bento-med">Google</Text>
            </View>

            <Pressable
              className="mt-8 items-center"
              onPress={() => navigate("Reset Password")}
            >
              <GradientText
                className="text-xs capitalize"
                text="Forgot Password"
              />
            </Pressable>

            <Pressable
              className="mt-8 items-center"
              onPress={() => navigate("Sign Up", { animation: false })}
            >
              <GradientText
                className="text-xs capitalize"
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

  logoText: {
    fontSize: TextSize.x_large,
    textTransform: "uppercase",
  },
})

export default LoginScreenUI
