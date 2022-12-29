import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { OTPFormScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "OTP Form">

const OTPFormScreen = ({ navigation, route }: Props) => {
  const {
    params: { email },
  } = route

  const { mutate } = trpc.courier.auth.confirmOTP.useMutation({
    onSuccess() {
      navigation.navigate("Change Password", { email })
    },
    onError(error) {
      Alert.alert("OTP ERROR", error.message)
    },
  })

  const [pin1, changePin1] = useState("")
  const [pin2, changePin2] = useState("")
  const [pin3, changePin3] = useState("")
  const [pin4, changePin4] = useState("")

  const otpProps = {
    pin1,
    pin2,
    pin3,
    pin4,
    changePin1,
    changePin2,
    changePin3,
    changePin4,
  }

  const sendPin = () => mutate({ email, otp: `${pin1}${pin2}${pin3}${pin4}` })

  return <OTPFormScreenUI sendPin={sendPin} {...otpProps} />
}

export default OTPFormScreen
