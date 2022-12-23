import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { OTPFormScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"

type Props = NativeStackScreenProps<AuthScreenType, "OTP Form">

const OTPFormScreen = ({ navigation }: Props) => {
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

  const sendPin = () => {
    console.log("Leaving OTP Form")
    navigation.navigate("Change Password")
  }
  return <OTPFormScreenUI sendPin={sendPin} {...otpProps} />
}

export default OTPFormScreen
