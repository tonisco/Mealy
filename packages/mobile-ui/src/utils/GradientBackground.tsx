import { LinearGradient } from 'expo-linear-gradient'

import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type props={
  children?:React.ReactNode
  style?: StyleProp<ViewStyle>
}

const GradientBackground:(props:props)=> JSX.Element = ({children,style}) => {
  return (
    <LinearGradient style={style}  colors={['#53E88B', '#15BE77']} start={{ x: 0, y:-.24 }} end={{ x: 1, y: 0.24 }} locations={[0.33, 0.67]} >
        {children}
    </LinearGradient>
  )
}

export default GradientBackground