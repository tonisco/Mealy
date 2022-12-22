import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  BackButton,
  GradientButton,
  Input,
  IsIos,
  Colors,
  TextSize,
} from "mobile-ui"
import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { AuthStack } from "../../constants/screen"

type Props = NativeStackScreenProps<AuthStack, "Reset Password">

const ResetPasswordScreen = ({ navigation }: Props) => {
  const [email, changeEmail] = useState("")

  const sendPin = () => {
    console.log("Leaving Reset Password")
    navigation.navigate("OTP Form")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Reset Password</Text>
          <Text style={styles.description}>
            Please enter your email to receive a 4 digit code to reset your
            password
          </Text>
        </View>
        <Input
          placeholder="Email"
          iconName={IsIos ? "ios-mail" : "mail"}
          check={false}
          value={email}
          changeText={changeEmail}
          style={styles.widthFull}
        />

        <View style={styles.buttonContainer}>
          <GradientButton text="send" onPress={sendPin} />
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

export default ResetPasswordScreen
