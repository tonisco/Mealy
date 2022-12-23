import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ResetPasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Reset Password">

const ResetPasswordScreen = (props: Props) => {
  return <ResetPasswordScreenUI {...props} />
}

export default ResetPasswordScreen
