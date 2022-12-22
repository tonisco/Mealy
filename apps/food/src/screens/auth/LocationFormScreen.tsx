import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  BackButton,
  GradientButton,
  Input,
  IsIos,
  Colors,
  TextSize,
} from "mobile-ui"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as z from "zod"

import { AuthStack } from "../../constants/screen"
import { UseSignUpState } from "../../store/SignUpStore"

type FormData = {
  street: string
  city: string
  country: string
}

type Props = NativeStackScreenProps<AuthStack, "Location Form">

const LocationFormScreen = ({ navigation }: Props) => {
  const { setSignUpState, signUpState } = UseSignUpState()

  const schema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpState,
    resolver: zodResolver(schema),
  })

  const createProfile = (data: FormData) => {
    console.log(data)
    console.log(signUpState)
    setSignUpState({ ...signUpState, ...data })
    console.log("Leaving Reset Password")
    navigation.navigate("Location Form")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Set Your Location</Text>
          <Text style={styles.description}>
            This data will be displayed in your account profile for security
          </Text>
        </View>
        <Input
          check
          control={control}
          inputName="street"
          placeholder="Street Address"
          iconName={IsIos ? "ios-location" : "location"}
          style={styles.widthFull}
          error={errors.street?.message}
        />

        <Input
          check
          control={control}
          inputName="city"
          placeholder="City"
          iconName={IsIos ? "ios-location" : "location"}
          style={styles.widthFull}
          error={errors.city?.message}
        />

        <Input
          check
          control={control}
          inputName="country"
          placeholder="Country"
          iconName={IsIos ? "ios-location" : "location"}
          style={styles.widthFull}
          error={errors.country?.message}
        />

        <View style={styles.buttonContainer}>
          <GradientButton text="finish" onPress={handleSubmit(createProfile)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  scroll: {
    flex: 1,
  },
  textContainer: {
    alignItems: "flex-start",
    marginBottom: 15,
  },
  heading: {
    fontFamily: "font-bold",
    fontSize: TextSize.large,
    textTransform: "uppercase",
    color: Colors.dark,
    textAlign: "left",
    marginBottom: 5,
  },
  description: {
    fontSize: TextSize.tiny,
    color: Colors.dark,
    textAlign: "left",
    fontFamily: "font-regular",
    lineHeight: 13,
    marginTop: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  widthFull: { width: "100%" },
})

export default LocationFormScreen
