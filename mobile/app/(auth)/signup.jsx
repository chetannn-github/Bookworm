import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import styles from '../../assets/styles/login.styles'
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/color'

const Signup = () => {
  let [username, setUsername] = useState("");
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let [showPassword,setShowPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let handleSignup = () =>{
    
    console.log("Signup fn chal rha hh");
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
                name='person-outline'
                color={COLORS.primary}
                style = {styles.inputIcon}
                size={20}
                />
                <TextInput 
                style = {styles.input}
                value={username}
                onChangeText={(val)=>setUsername(val)}
                keyboardType='default'
                placeholder='chetan25'
                placeholderTextColor={COLORS.placeholderText}
                maxLength={15}
                />

                
              </View>
            </View> 
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
                placeholder='chetan@gmail.com'
                placeholderTextColor={COLORS.placeholderText}
                maxLength={15}
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
                placeholder='**********'
                value={password}
                onChangeText={(val)=> setPassword(val)}
                placeholderTextColor={COLORS.placeholderText}
                secureTextEntry = {!showPassword}
                maxLength={15}
                
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

            {/* signup button */}
            <TouchableOpacity style = {styles.button} disabled = {isLoading} onPress={handleSignup}>
              {isLoading ? (
                <ActivityIndicator color={"white"}></ActivityIndicator>
              ):( 
              <Text style = {styles.buttonText}>Signup</Text>)}
            </TouchableOpacity>

            <View style = {styles.footer}>
                <Text style= {styles.footerText}>Already have an account ?</Text>
                <Link style={styles.link} href={"/(auth)/login"} >Login</Link>
            </View>

          </View>
        </View>


      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup