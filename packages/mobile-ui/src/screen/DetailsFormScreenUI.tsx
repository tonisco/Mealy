import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"

import { UseSignUpState } from "../context"
import { AuthScreenType } from "../screenTypes/default"
import { BackButton, GradientButton, Input } from "../ui"
import { Colors, IsIos, TextSize } from "../utils"

type FormData = {
  firstName: string
  lastName: string
  phone: string
}

type Props = NativeStackScreenProps<AuthScreenType, "Details Form">

const DetailsFormScreenUI = ({ navigation }: Props) => {
  const { setSignUpState, signUpState } = UseSignUpState()

  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: "First Name must contain at least 3 characters" })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: "Last Name must contain at least 3 characters" })
      .trim(),
    phone: z.string().min(5, { message: "Number must be at least 5 Numbers" }),
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
          <Text style={styles.heading}>Fill in your bio to get started</Text>
          <Text style={styles.description}>
            This data will be displayed in your account profile for security
          </Text>
        </View>
        <Input
          check
          control={control}
          inputName="firstName"
          placeholder="First Name"
          iconName={IsIos ? "ios-person" : "person"}
          style={styles.widthFull}
          error={errors.firstName?.message}
        />

        <Input
          check
          control={control}
          inputName="lastName"
          placeholder="Last Name"
          iconName={IsIos ? "ios-person" : "person"}
          style={styles.widthFull}
          error={errors.lastName?.message}
        />

        <Input
          check
          control={control}
          inputName="phone"
          placeholder="Mobile Number"
          iconName={IsIos ? "ios-call" : "call"}
          style={styles.widthFull}
          error={errors.phone?.message}
        />

        <View style={styles.buttonContainer}>
          <GradientButton text="next" onPress={handleSubmit(createProfile)} />
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

export default DetailsFormScreenUI
