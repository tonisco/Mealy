import { GradientBackground, GradientButton, TextClip } from "mobile-ui"
import React from "react"
import { Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native"

const OnboardingOne = () => {
  const nextPage = () => {
    console.log("object")
  }

  return (
    // <Onboarding
    //   heading='Order a Tasty Dish'
    //   description='Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep'
    //   page={1}
    //   onPress={nextPage}
    //   Image={<Image className='h-56 w-48' source={require('../../../assets/onboarding4.png')} resizeMode={'contain'}/>}/>
    <SafeAreaView className="bg-color mb-7 flex-1 items-center justify-center">
      <View className="items-center justify-center gap-y-20">
        <View className="items-center gap-y-5 p-3.5">
          <Image
            className="h-48 w-48"
            source={require("../../../assets/onboarding4.png")}
            resizeMode={"contain"}
            resizeMethod={"resize"}
          />
          <View className="items-center">
            <TextClip>
              <Text
                style={{ color: "black" }}
                className="w-full text-4xl font-bold uppercase"
              >
                Order a Tasty Dish
              </Text>
            </TextClip>
            <View>
              <Text className="mt-1 text-xs capitalize text-dark">
                Discover the best foods from over 1,000 restaurants and fast
                delivery to your doorstep
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-x-3">
          <GradientBackground
            style={{ height: 10, width: 10, borderRadius: 5 }}
          />
          <View className="h-2.5 w-2.5 rounded-full bg-lite-gray"></View>
          <View className="h-2.5 w-2.5 rounded-full bg-lite-gray"></View>
        </View>
      </View>
      <TouchableOpacity className="absolute bottom-8 ">
        <GradientButton>
          <Text className="text-lg uppercase text-white">next</Text>
        </GradientButton>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OnboardingOne
