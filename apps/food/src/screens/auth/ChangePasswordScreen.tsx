import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ChangePasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Change Password">

type FormData = {
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = ({ navigation }: Props) => {
  const changePassword = (data: FormData) => {
    console.log(data)
    console.log("Leaving Change Password")
    navigation.navigate("Success Screen", {
      message: "your password has been changed",
      nextScreen: "Log In",
    })
    // navigate to failed screen
    // navigation.navigate("Failure Screen", {
    //   message: "Your new Password was not saved",
    //   nextScreen: "Log In",
    // })
  }

  return <ChangePasswordScreenUI changePassword={changePassword} />
}

export default ChangePasswordScreen
