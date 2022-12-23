import React, { Dispatch, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BackButton, GradientButton, SquareInput } from "../ui"
import { Colors, TextSize } from "../utils"

type Props = {
  pin1: string
  changePin1: Dispatch<React.SetStateAction<string>>
  pin2: string
  changePin2: Dispatch<React.SetStateAction<string>>
  pin3: string
  changePin3: Dispatch<React.SetStateAction<string>>
  pin4: string
  changePin4: Dispatch<React.SetStateAction<string>>
  sendPin: () => void
}

const OTPFormScreenUI = ({
  sendPin,
  pin1,
  changePin1,
  changePin2,
  changePin3,
  changePin4,
  pin2,
  pin3,
  pin4,
}: Props) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
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
  inputContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
})

export default OTPFormScreenUI
