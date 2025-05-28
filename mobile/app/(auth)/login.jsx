import { View, Text, KeyboardAvoidingView, ScrollView, Image, TextInput, useWindowDimensions, Touchable, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import styles from '../../assets/styles/login.styles'
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/color'

const Login = () => {
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let [showPassword,setShowPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let handleLogin = () =>{
    console.log("login fn chal rha hh");
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    >
      <View style={styles.container}>

        <View style = {styles.topIllustration}>
          <Image 
          style = {styles.illustrationImage} 
          source={require("../../assets/images/illustration.png")}
          resizeMode='contain'
          >
          </Image>
        </View>

        <View style = {styles.card}>
          
          <View style = {styles.formContainer}>
            {/* email input */}
            <View style= {styles.inputGroup}>
              <Text style = {styles.label}>Email</Text>
              <View style= {styles.inputContainer}>
                <Ionicons
                name='mail-outline'
                color={COLORS.primary}
                style = {styles.inputIcon}
                size={20}
                />
                <TextInput 
                style = {styles.input}
                value={email}
                onChangeText={(val)=>setEmail(val)}
                keyboardType='email-address'
                placeholder='enter your email address'
                placeholderTextColor={COLORS.placeholderText}
                />

                
              </View>
            </View> 

            {/* password input */}
            <View style= {styles.inputGroup}>
              <Text style = {styles.label}>Password</Text>
              <View style= {styles.inputContainer}>
                <Ionicons
                name='lock-closed-outline'
                color={COLORS.primary}
                style = {styles.inputIcon}
                size={20}
                />
                <TextInput 
                style = {styles.input}
                keyboardType='default'
                placeholder='enter your password'
                value={password}
                onChangeText={(val)=> setPassword(val)}
                placeholderTextColor={COLORS.placeholderText}
                secureTextEntry = {!showPassword}
                
                />
                <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                  <Ionicons
                  name={!showPassword ? `eye` : `eye-off`}
                  color={COLORS.primary}
                  style = {styles.inputIcon}
                  size={20}
                  />
                </TouchableOpacity>   



                
              </View>
            </View>

            {/* login button */}
            <TouchableOpacity style = {styles.button} disabled = {isLoading} onPress={handleLogin}>
              {isLoading ? (
                <ActivityIndicator color={"white"}></ActivityIndicator>
              ):( 
              <Text style = {styles.buttonText}>Login</Text>)}
            </TouchableOpacity>

            <View style = {styles.footer}>
                <Text style= {styles.footerText}>Don't have an account ?</Text>
                <Link style={styles.link} href={"/signup"}>Signup</Link>
            </View>

          </View>
        </View>


      </View>
    </KeyboardAvoidingView>
  )
}

export default Login