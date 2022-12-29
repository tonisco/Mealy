import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ChangePasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Change Password">

type FormData = {
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = ({ navigation, route }: Props) => {
  const {
    params: { email },
  } = route

  const { mutate } = trpc.courier.auth.changePassword.useMutation({
    onSuccess(message) {
      passwordChangeSuccess(message)
    },
    onError(error) {
      passwordChangeFailed({ message: error.message })
    },
  })

  const changePassword = ({ password }: FormData) => mutate({ email, password })

  const passwordChangeSuccess = ({ message }: { message: string }) =>
    navigation.navigate("Success Screen", { message, nextScreen: "Log In" })

  const passwordChangeFailed = ({ message }: { message: string }) =>
    navigation.navigate("Failure Screen", { message, nextScreen: "Log In" })

  return <ChangePasswordScreenUI changePassword={changePassword} />
}

export default ChangePasswordScreen
