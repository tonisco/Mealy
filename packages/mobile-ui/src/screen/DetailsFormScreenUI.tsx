import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DetailsFormSchema, detailsFormSchema } from "schema"

import { UseSignUpState } from "../context"
import { AuthScreenType } from "../screenTypes/default"
import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

type Props = NativeStackScreenProps<AuthScreenType, "Details Form">

const DetailsFormScreenUI = ({ navigation }: Props) => {
  const { setSignUpState, signUpState } = UseSignUpState()

  const resolver = zodResolver(detailsFormSchema)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpState,
    resolver,
  })

  const createProfile = (data: DetailsFormSchema) => {
    setSignUpState({ ...signUpState, ...data })
    navigation.navigate("Location Form")
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1 }}
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
          control={control}
          inputName="firstName"
          placeholder="First Name"
          iconName={IsIos ? "ios-person" : "person"}
          className="w-full"
          error={errors.firstName?.message}
        />

        <Input
          control={control}
          inputName="lastName"
          placeholder="Last Name"
          iconName={IsIos ? "ios-person" : "person"}
          className="w-full"
          error={errors.lastName?.message}
        />

        <Input
          control={control}
          inputName="phone"
          placeholder="Mobile Number"
          iconName={IsIos ? "ios-call" : "call"}
          className="w-full"
          error={errors.phone?.message}
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="next" onPress={handleSubmit(createProfile)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailsFormScreenUI
