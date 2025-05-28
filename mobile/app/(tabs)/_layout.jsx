import {Tabs} from "expo-router"
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home"/>
        <Tabs.Screen name="profile"/>
        <Tabs.Screen name="create"/>
    </Tabs>
  )
}

export default TabLayout