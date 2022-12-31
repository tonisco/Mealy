import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { View, Image, Text } from "react-native"

import { AuthScreenType } from "../screenTypes/default"
import GradientButton from "../ui/GradientButton"

type Props = NativeStackScreenProps<AuthScreenType, "Failure Screen">

const FailureScreen = ({ navigation, route }: Props) => {
  return (
    <View className="mb-12 flex-1 items-center justify-center p-5">
      <Image
        source={require("../assets/fail.png")}
        className="h-[200px] w-[215px]"
        resizeMode="contain"
      />
      <View className="mt-8">
        <Text className="my-1 text-center font-bento-bold text-3xl text-red-700">
          Request Failed
        </Text>
        <Text className="font-bento-bold capitalize">
          {route.params?.message}
        </Text>
      </View>
      <View className="absolute bottom-10 self-center">
        <GradientButton
          text="next"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: route.params.nextScreen,
                  params: { ...route.params.nextScreenParams },
                },
              ],
            })
          }
        />
      </View>
    </View>
  )
}

export default FailureScreen
