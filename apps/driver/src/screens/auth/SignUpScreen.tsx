import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SignUpScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

const SignUpScreen = (props: Props) => {
  return (
    <SignUpScreenUI
      {...props}
      logoText="Mealy Driver"
      logoImageSource={require("../../../assets/images/Asset1.png")}
      googleImageSource={require("../../../assets/images/google.png")}
    />
  )
}

export default SignUpScreen
