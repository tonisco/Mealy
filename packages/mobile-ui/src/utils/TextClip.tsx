import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import GradientBackground from './GradientBackground'
import { View } from 'react-native'

const TextClip = ({ children }: { children: React.ReactElement }) => {
    return ( 
        <MaskedView
      style={{ flex: 1, flexDirection: 'row', maxHeight:37 }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </View>
      }
    >
      <GradientBackground style={{flex:1}}/>
    </MaskedView>
    )
}

export default TextClip

