import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { OTPFormScreenUI } from "mobile-ui"
import React from "react"
import { Alert } from "react-native"
import { OtpFormSchema } from "schema"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"
import { AuthScreenType } from "../../screenTypes"

type Props = NativeStackScreenProps<AuthScreenType, "OTP Form">

const OTPFormScreen = ({ navigation, route }: Props) => {
  const {
    params: { email },
  } = route

  const { mutate, isLoading } = trpc.food.auth.confirmOTP.useMutation({
    onSuccess() {
      navigation.navigate("Change Password", { email })
    },
    onError(error) {
      Alert.alert("OTP ERROR", error.message)
    },
  })

  const sendPin = ({ pin1, pin2, pin3, pin4 }: OtpFormSchema) =>
    mutate({ email, otp: `${pin1}${pin2}${pin3}${pin4}` })

  return (
    <>
      {isLoading && <LoadingUI />}
      <OTPFormScreenUI sendPin={sendPin} />
    </>
  )
}

export default OTPFormScreen
