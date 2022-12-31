import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { View, Image, StyleSheet, Text } from "react-native"

import { AuthScreenType } from "../screenTypes/default"
import GradientButton from "../ui/GradientButton"
import GradientText from "../ui/GradientText"
import TextSize from "../utils/TextSize"

type Props = NativeStackScreenProps<AuthScreenType, "Success Screen">

const SuccessScreen = ({ navigation, route }: Props) => {
  return (
    <View className="mb-12 flex-1 items-center justify-center p-5">
      <Image
        source={require("../assets/success.png")}
        className="h-[200px] w-[215]"
        resizeMode="contain"
      />

      <View className="mt-8">
        <GradientText text="Congrats" style={styles.heading} />

        <Text className="font-bento-bold capitalize">
          {route.params.message}
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

export default SuccessScreen

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    fontSize: TextSize.large,
  },
})
