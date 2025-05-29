import { View, Text, KeyboardAvoidingView, ScrollView, Image, TextInput, useWindowDimensions, Touchable, TouchableOpacity, ActivityIndicator, Platform, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import styles from '../../assets/styles/login.styles'
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/color'
import { useAuthStore } from '../../store/authStore'

const Login = () => {
  let {login, isLoading} = useAuthStore();
  let [username,setUsername] = useState("");
  let [password,setPassword] = useState("");
  let [showPassword,setShowPassword] = useState(false);


  let handleLogin = async() =>{
    if(!username || !password) {
      Alert.alert("error","please fill all the field");
      return;
    }

    let result = await login(username, password);
    
    if(result?.error) {
      Alert.alert("error " , result.error);
    }

    // useEffect(()=>{
    //   console.log("useeffect chala")
    //   router.replace("/(tabs)/home")
    // },[])
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
              <Text style = {styles.label}>Username</Text>
              <View style= {styles.inputContainer}>
                <Ionicons
                name='mail-outline'
                color={COLORS.primary}
                style = {styles.inputIcon}
                size={20}
                />
                <TextInput 
                style = {styles.input}
                value={username}
                onChangeText={(val)=>setUsername(val)}
                keyboardType='default'
                placeholder='enter your username'
                placeholderTextColor={COLORS.placeholderText}
                maxLength={25}
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
                maxLength={25}
                
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
                <TouchableWithoutFeedback onPress={()=>router.back()}>
                  <Text style = {styles.link}>Signup</Text>
                </TouchableWithoutFeedback>
            </View>

          </View>
        </View>


      </View>

      <Link href={"/(tabs)/home"}>Go to tabs</Link>
    </KeyboardAvoidingView>
  )
}

export default Login