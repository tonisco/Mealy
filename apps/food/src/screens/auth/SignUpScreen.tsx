import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SignUpScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useEffect } from "react"
import { trpc } from "trpc-client/src"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

const SignUpScreen = (props: Props) => {
  const data = trpc.home.useQuery()

  useEffect(() => {
    console.log(data.data?.message)
  }, [data])

  return (
    <SignUpScreenUI
      {...props}
      logoText="Mealy Food"
      logoImageSource={require("../../../assets/images/Asset2.png")}
      googleImageSource={require("../../../assets/images/google.png")}
    />
  )
}

export default SignUpScreen
