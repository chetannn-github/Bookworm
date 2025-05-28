import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const Index = () => {
  
  return (
    <View>
      <Link href={'/(auth)/login'}>Go to auth</Link>
      <Text>main index route</Text>
      <Link href={'/(auth)/login'}>Go to auth</Link>
    </View>
  )
}

export default Index