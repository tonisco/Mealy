import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  BackButton,
  GradientButton,
  Colors,
  TextSize,
  SquareInput,
} from "mobile-ui"
import React, { useRef, useState } from "react"
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { AuthStack } from "../../constants/screen"

type Props = NativeStackScreenProps<AuthStack, "Reset Password">

const ResetPasswordScreen = ({ navigation }: Props) => {
  const [pin1, changePin1] = useState("")
  const [pin2, changePin2] = useState("")
  const [pin3, changePin3] = useState("")
  const [pin4, changePin4] = useState("")

  const pin1Ref = useRef<TextInput>(null)
  const pin2Ref = useRef<TextInput>(null)
  const pin3Ref = useRef<TextInput>(null)
  const pin4Ref = useRef<TextInput>(null)

  const pinChange1 = (v: string) => {
    changePin1(v)
    if (v) pin2Ref.current?.focus()
  }
  const pinChange2 = (v: string) => {
    changePin2(v)
    if (v) pin3Ref.current?.focus()
  }
  const pinChange3 = (v: string) => {
    changePin3(v)
    if (v) pin4Ref.current?.focus()
  }
  const pinChange4 = (v: string) => {
    changePin4(v)
    if (v) Keyboard.dismiss()
  }

  const sendPin = () => {
    console.log("Leaving OTP Form")
    navigation.navigate("Change Password")
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>We have sent an OTP to your Email</Text>
        <Text style={styles.description}>
          Please check your Email for your otp, to continue to reset your
          password
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <SquareInput value={pin1} onChangeText={pinChange1} ref={pin1Ref} />
        <SquareInput value={pin2} onChangeText={pinChange2} ref={pin2Ref} />
        <SquareInput value={pin3} onChangeText={pinChange3} ref={pin3Ref} />
        <SquareInput value={pin4} onChangeText={pinChange4} ref={pin4Ref} />
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton text="next" onPress={sendPin} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
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
  inputContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
})

export default ResetPasswordScreen
