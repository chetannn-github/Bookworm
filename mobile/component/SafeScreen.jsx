import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/color'
import {useSafeAreaInsets} from "react-native-safe-area-context"

export default function SafeScreen  ({children}) {
    const inset = useSafeAreaInsets();

    return (
        <View style = {[styles.container,{paddingTop : inset.top,paddingBottom : inset.bottom}]}>
            {children}
        </View>
    
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLORS.background
    }
})

