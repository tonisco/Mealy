import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LocationFormScreenUI, UseSignUpState, UseUserState } from "mobile-ui"
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
  const { saveUser } = UseUserState()

  const {
    clearState,
    signUpState: { email, firstName, lastName, password, phone },
  } = UseSignUpState()

  const { mutate } = trpc.courier.auth.signup.useMutation({
    onError(error) {
      failedCreateProfile(error)
    },
    onSuccess(data) {
      saveUser(data).then(successCreateProfile).catch(failedCreateProfile)
    },
  })

  const createProfile = ({ city, country, street, state }: FormData) =>
    mutate({
      city,
      country,
      email,
      fullName: `${firstName} ${lastName}`,
      password,
      phone,
      state,
      street,
    })

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
