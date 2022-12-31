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
import { IsIos } from "../utils"

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
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View className="mb-4 items-start">
          <Text className="mb-1 text-left font-bento-bold text-3xl uppercase text-dark">
            Fill in your bio to get started
          </Text>
          <Text className="mt-1 text-left font-bento-reg text-xs leading-3 text-dark">
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

        <View className="absolute bottom-12 self-center">
          <GradientButton text="next" onPress={handleSubmit(createProfile)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  widthFull: { width: "100%" },
})

export default DetailsFormScreenUI
