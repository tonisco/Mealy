import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardingOne,OnboardingThree,OnboardingTwo } from '../../screens/onboarding'

const Stack = createStackNavigator()


const OnboardingNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='Onboarding 1' component={OnboardingOne} />
            <Stack.Screen name='Onboarding 2' component={OnboardingTwo} />
            <Stack.Screen name='Onboarding 3' component={OnboardingThree} />
        </Stack.Navigator>
    )
}

export default OnboardingNavigator
