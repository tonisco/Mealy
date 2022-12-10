import React from 'react'
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import GradientButton from '../ui/GradientButton'
import GradientBackground from '../utils/GradientBackground'
import TextClip from '../utils/TextClip'

type Props = {
    heading: string
    description: string
    onPress: () => void
    page: number
    Image: React.ReactElement<Image>
}

const onboarding = ({ heading, description, onPress, page ,Image}: Props) => {
    return (
        <SafeAreaView className='justify-center items-center flex-1 bg-color mb-7'>
            <View className='justify-center items-center gap-y-20'>
                <View className='items-center p-3.5 gap-y-5'>
                    {Image}
                    <View className='items-center'>
                        <TextClip>
                            <Text className='text-4xl uppercase w-full font-bold'>{heading}</Text>
                        </TextClip>
                        <View>
                            <Text className='text-xs mt-1 text-dark capitalize'>{description}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-row gap-x-3'>
                    {Array.from({ length: 3 }, (_, i) => i + 1 === page ? <GradientBackground style={{ height: 10, width: 10, borderRadius: 5 }} key={i+1} /> :
                        <View className='h-2.5 w-2.5 bg-lite-gray rounded-full' key={i+1}/>
                    )}
                </View>
            </View>
            <Pressable className='absolute bottom-8' onPress={onPress}>
                <GradientButton>
                    <Text className='text-lg text-white uppercase'>next</Text>
                </GradientButton>
            </Pressable>
        </SafeAreaView>
    )
}

export default onboarding
