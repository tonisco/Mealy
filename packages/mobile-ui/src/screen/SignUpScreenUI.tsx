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
import { SignUpFormSchema, signUpFormSchema } from "schema"

import { moveToTop } from "../animation"
import { UseSignUpState } from "../context/SignUpStore"
import { AuthScreenType } from "../screenTypes/default"
import { GradientButton, GradientText, Input } from "../ui"
import { IsIos } from "../utils"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up"> & {
  logoText: string
  logoImageSource: ImageSourcePropType
  googleImageSource: ImageSourcePropType
  createAccount: ({ email, password }: SignUpFormSchema) => void
}

const SignUpScreenUI = ({
  navigation,
  logoText,
  logoImageSource,
  googleImageSource,
  createAccount,
  route,
}: Props) => {
  const { params } = route
  const animate = params?.animation !== false

  const { navigate } = navigation

  const { signUpState } = UseSignUpState()

  const resolver = zodResolver(signUpFormSchema)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpState,
    resolver,
  })

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
            Sign up for Free
          </Animated.Text>
          <Animated.View
            className="my-5"
            entering={animate ? ZoomIn.duration(500).delay(1500) : undefined}
          >
            <Input
              control={control}
              error={errors.email?.message}
              inputName="email"
              placeholder="Email"
              iconName={IsIos ? "ios-mail" : "mail"}
            />
            <Input
              control={control}
              error={errors.password?.message}
              inputName="password"
              placeholder="Password"
              iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
              encrypt
            />
            <Input
              control={control}
              error={errors.confirmPassword?.message}
              inputName="confirmPassword"
              placeholder="Confirm Password"
              iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
              encrypt
            />
          </Animated.View>
          <Animated.View
            className="mt-4 mb-3"
            entering={
              animate ? BounceInDown.duration(800).delay(1900) : undefined
            }
          >
            <GradientButton
              text="Create Account"
              onPress={handleSubmit(createAccount)}
            />
          </Animated.View>

          <Animated.View
            className="my-3"
            entering={animate ? ZoomIn.duration(800).delay(2600) : undefined}
          >
            <Text className="my-3 text-center font-bento-bold text-xs capitalize">
              Or Continue With
            </Text>
            <View className="my-3 w-60 flex-row items-center justify-center gap-x-2 rounded-lg bg-white p-3 shadow shadow-black">
              <Image
                source={googleImageSource}
                className=" h-7 w-7"
                resizeMode="contain"
              />
              <Text className=" font-bento-med">Google</Text>
            </View>
            <Pressable
              className="mt-8 items-center"
              onPress={() => navigate("Log In", { animation: false })}
              testID="loginLink"
            >
              <GradientText
                className="text-xs capitalize"
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
    zIndex: -50,
  },
})

export default SignUpScreenUI
