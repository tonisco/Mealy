import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LocationFormScreenUI, UseSignUpState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Location Form">

type FormData = {
  street: string
  city: string
  country: string
  state: string
}

const LocationFormScreen = ({ navigation }: Props) => {
  const {
    clearState,
    signUpState: { email, firstName, lastName, password, phone },
  } = UseSignUpState()

  const { mutate } = trpc.food.auth.signUp.useMutation({
    onError(error) {
      failedCreateProfile({ message: error.message })
    },
    onSuccess(data) {
      // TODO: save data
      console.log(data)
      successCreateProfile()
    },
  })

  const createProfile = (data: FormData) => {
    const { city, country, street, state } = data
    mutate({
      city,
      country,
      email,
      phone,
      state,
      street,
      password,
      fullName: `${firstName} ${lastName}`,
    })
  }

  const successCreateProfile = () => {
    // clear state
    clearState()
    navigation.navigate("Success Screen", {
      message: "Your account has successfully been created",
      nextScreen: "Log In",
    })
  }

  const failedCreateProfile = ({ message }: { message: string }) =>
    Alert.alert("Failed to create password", message)

  return <LocationFormScreenUI createProfile={createProfile} />
}

export default LocationFormScreen
