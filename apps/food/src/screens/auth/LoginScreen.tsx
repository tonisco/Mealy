import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoginScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Log In">

const LoginScreen = (props: Props) => {
  const [email, changeEmail] = useState("")
  const [password, changePassword] = useState("")

  const loginAccount = () => {
    console.log("yes")
  }
  return (
    <LoginScreenUI
      {...props}
      email={email}
      changeEmail={changeEmail}
      password={password}
      changePassword={changePassword}
      loginAccount={loginAccount}
      logoImageSource={require("../../../assets/images/Asset2.png")}
      googleImageSource={require("../../../assets/images/google.png")}
    />
  )
}

export default LoginScreen
