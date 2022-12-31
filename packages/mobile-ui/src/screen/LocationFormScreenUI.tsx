import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"

import { UseSignUpState } from "../context"
import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

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
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View className="mb-4 self-start">
          <Text className="mb-1 text-left font-bento-bold text-3xl uppercase text-dark">
            Set Your Location
          </Text>
          <Text className="mt-1 text-left font-bento-reg text-xs leading-4 text-dark">
            This data will be displayed in your account profile for security
          </Text>
        </View>
        <Input
          check
          control={control}
          inputName="street"
          placeholder="Street Address"
          iconName={IsIos ? "ios-location" : "location"}
          className="w-full"
          error={errors.street?.message}
        />

        <Input
          check
          control={control}
          inputName="city"
          placeholder="City"
          iconName={IsIos ? "ios-location" : "location"}
          className="w-full"
          error={errors.city?.message}
        />

        <Input
          check
          control={control}
          inputName="state"
          placeholder="State"
          iconName={IsIos ? "ios-location" : "location"}
          className="w-full"
          error={errors.state?.message}
        />

        <Input
          check
          control={control}
          inputName="country"
          placeholder="Country"
          iconName={IsIos ? "ios-location" : "location"}
          className="w-full"
          error={errors.country?.message}
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="finish" onPress={handleSubmit(createProfile)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LocationFormScreenUI
