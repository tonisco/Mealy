import React from 'react'
import { Text, View, Image, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OnboardingOne = () => {
    return (
        <SafeAreaView className='justify-center items-center flex-1 p-3.5 gap-8 bg-color'>
            <View className='justify-center items-center gap-y-5'>
            <Image className='h-40 w-40' source={require('../../../assets/onboarding4.png')} />
            <View className='bg-green-700'>
                <Text className='text-4xl uppercase bg-clip-text'>Order a Tasty Dish</Text>
            </View>
            <Text className='text-xs text-dark'>Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep</Text>
            <View className='flex-row gap-x-3'>
                <View className='h-2.5 w-2.5 bg-lite-green rounded-full'></View>
                <View className='h-2.5 w-2.5 bg-lite-gray rounded-full'></View>
                <View className='h-2.5 w-2.5 bg-lite-gray rounded-full'></View>
            </View>
            </View>
            <TouchableOpacity className=''>
                <Text>next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default OnboardingOne
