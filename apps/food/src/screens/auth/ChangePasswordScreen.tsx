import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  BackButton,
  GradientButton,
  Input,
  IsIos,
  Colors,
  TextSize,
} from "mobile-ui"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as z from "zod"

import { AuthStack } from "../../constants/screen"

type Props = NativeStackScreenProps<AuthStack, "Change Password">

type FormData = {
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = ({ navigation }: Props) => {
  const sendPin = (data: FormData) => {
    console.log(data)
    console.log("Leaving Change Password")
    navigation.navigate("Success Screen", {
      message: "your password has been changed",
      nextScreen: "Log In",
    })
    // navigate to failed screen
    // navigation.navigate("Failure Screen", {
    //   message: "Your new Password was not saved",
    //   nextScreen: "Log In",
    // })
  }

  const schema = z
    .object({
      password: z
        .string()
        .min(6, "Password must contain at least 6 Character(s)"),
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
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />

        <View style={styles.textContainer}>
          <Text style={styles.heading}>New Password</Text>
          <Text style={styles.description}>Please enter your new password</Text>
        </View>

        <Input
          check
          control={control}
          inputName="password"
          placeholder="Password"
          error={errors.password?.message}
          encrypt
          iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
          style={styles.widthFull}
        />

        <Input
          check
          control={control}
          inputName="confirmPassword"
          placeholder="Confirm Password"
          encrypt
          error={errors.confirmPassword?.message}
          iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
          style={styles.widthFull}
        />

        <View style={styles.buttonContainer}>
          <GradientButton text="save" onPress={handleSubmit(sendPin)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  scroll: {
    flex: 1,
  },
  textContainer: {
    alignItems: "flex-start",
    marginBottom: 15,
  },
  heading: {
    fontFamily: "font-bold",
    fontSize: TextSize.large,
    textTransform: "uppercase",
    color: Colors.dark,
    textAlign: "left",
    marginBottom: 5,
  },
  description: {
    fontSize: TextSize.tiny,
    color: Colors.dark,
    textAlign: "left",
    fontFamily: "font-regular",
    lineHeight: 13,
    marginTop: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  widthFull: { width: "100%" },
})

export default ChangePasswordScreen
