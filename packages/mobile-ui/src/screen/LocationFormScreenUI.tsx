import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"

import { UseSignUpState } from "../context"
import { BackButton, GradientButton, Input } from "../ui"
import { Colors, IsIos, TextSize } from "../utils"

type Props = { createProfile: (data: FormData) => void }

type FormData = {
  street: string
  city: string
  country: string
  state: string
}

const LocationFormScreenUI = ({ createProfile }: Props) => {
  const { signUpState } = UseSignUpState()

  const schema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
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
          inputName="state"
          placeholder="State"
          iconName={IsIos ? "ios-location" : "location"}
          style={styles.widthFull}
          error={errors.state?.message}
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

export default LocationFormScreenUI
