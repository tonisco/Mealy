import React from 'react'
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { GradientBackground, GradientButton, TextClip, } from 'mobile-ui'

const OnboardingOne = () => {
  return (
    <SafeAreaView className='justify-center items-center flex-1 bg-color mb-7'>
      <View className='justify-center items-center gap-y-20'>
        <View className='items-center p-3.5 gap-y-5'>
          <Image className='h-44 w-48' source={require('../../../assets/onboarding4.png')} />
          <View className='items-center'>
            <TextClip>
              <Text style={{ color: 'black' }} className='text-4xl uppercase w-full font-bold'>Order a Tasty Dish</Text>
            </TextClip>
            <View>
              <Text className='text-xs mt-1 text-dark capitalize'>Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep</Text>
            </View></View>
        </View>
        <View className='flex-row gap-x-3'>
          <GradientBackground style={{ height: 10, width: 10, borderRadius: 5 }} />
          <View className='h-2.5 w-2.5 bg-lite-gray rounded-full'></View>
          <View className='h-2.5 w-2.5 bg-lite-gray rounded-full'></View>
        </View>
      </View>
      <TouchableOpacity className='absolute bottom-8 '>
        <GradientButton>
          <Text className='text-lg text-white uppercase'>next</Text>
        </GradientButton>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OnboardingOne
