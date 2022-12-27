import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SignUpScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

const SignUpScreen = (props: Props) => {
  const { mutateAsync } = trpc.food.auth.emailExist.useMutation()

  const checkMailExist = async (email: string) => {
    const isUsed = await mutateAsync({ email })
    return isUsed
  }

  return (
    <SignUpScreenUI
      {...props}
      logoText="Mealy Food"
      logoImageSource={require("../../../assets/images/Asset2.png")}
      googleImageSource={require("../../../assets/images/google.png")}
      checkMailExist={checkMailExist}
    />
  )
}

export default SignUpScreen
