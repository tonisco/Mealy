import React from 'react'
import { StyleSheet } from 'react-native'
import GradientBackground from '../utils/GradientBackground'

const GradientButton = ({ children }: { children: React.ReactElement }) => {
  return (
    <GradientBackground style={styles.button}>
      {children}
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10, 
    borderRadius: 30, 
    shadowColor: 'black', 
    shadowOffset: { height: 4, width: 3 }, 
    elevation: 3,
    shadowOpacity: .9, 
    shadowRadius: 3, 
    minWidth: 130, 
    alignItems: 'center'
  }
})

export default GradientButton