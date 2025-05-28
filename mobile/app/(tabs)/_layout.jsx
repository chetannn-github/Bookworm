import {Tabs} from "expo-router"
import React from 'react'
import {Ionicons} from "@expo/vector-icons"
import COLORS from "../../constants/color"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const TabLayout = () => {
  let insets = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        headerShown : false,
        tabBarActiveTintColor : COLORS.primary,
        tabBarStyle : {
          backgroundColor : COLORS.background,
          borderTopWidth : 1,
          borderColor : COLORS.primary,
          paddingBottom : insets.bottom,
          height : 60
        }

      }}
   
    >
        <Tabs.Screen 
        name="home"
        
        options={{
          title : "Home",
        
          tabBarIcon : ({color,size})=>(<Ionicons name="home-outline" size={25} color={color}></Ionicons>)
        }}
        />
        <Tabs.Screen 
        name="create"
        options={{
          title : "Create",
          tabBarIcon : ({color,size})=>(<Ionicons name="add-circle-outline" size={25} color={color}></Ionicons>)
        }}/>
        <Tabs.Screen
        name="profile"
        options={{
          title : "Create",
          tabBarIcon : ({color,size})=>(<Ionicons name="person-outline" size={25} color={color} ></Ionicons>)
        }}/>
        
    </Tabs>
  )
}

export default TabLayout