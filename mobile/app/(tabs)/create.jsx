import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/create.styles';
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/color';
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import {API_URL} from "../../constants/api"
import {useAuthStore} from "../../store/authStore"

const Create = () => {
  let {token} = useAuthStore();
   
  let [title,setTitle] = useState(null);
  let [caption,setCaption] = useState(null);
  let [image, setImage] = useState(null);
  let [rating, setRating] = useState(null);
  let [imageBase64, setImageBase64] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  let pickImage = async()=>{
    try {
      if(Platform.OS !== 'web') {
        let res = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(res);

        if(res.status !== "granted") {
          Alert.alert("error" , "we need camera roll permission to upload image");
          return;
        }


        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes : "images",
          allowsEditing : true,
          aspect : [4,3],
          base64 : true
        });

        if(!result.canceled){
          // console.log(result);
          setImage(result.assets[0].uri)

          if(result.assets[0].base64) {
            setImageBase64(result.assets[0].base64);
          }else {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding : FileSystem.EncodingType.Base64
            })
            setImageBase64(base64);
          }
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('error' , "error in picking image")
    }
  }

  let handleSubmit = async() => {
    if(!title || !caption || !rating || !imageBase64) {
      Alert.alert("Error" , "Please fill all the fields");
      return;
    }
    
    if(!token) {
      Alert.alert("Error" , "Access denied");
      return;
    }

    try {
      console.log("submit fn chala")
      setIsLoading(true);
      console.log(image);
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length-1];
      
      let imageURLBASE64 = "data:image/"+fileType+";base64," + imageBase64; 


      let response = await fetch(API_URL + "book/", {
        method : "post",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + token,
      },
      body : JSON.stringify({title,caption,rating, image : imageURLBASE64})
      })

      let result = await response.json();
      // console.log(result)
      
      if(!result?.success) {
        Alert.alert("error" , result.message)
        return;
      }
      
      Alert.alert("success" , result.message)

      setTitle(null);
      setCaption(null);
      setRating(null);
      setImageBase64(null);
      setImage(null);
      
    } catch (error) {
      Alert.alert("error" , "Internal Server error");
      console.log("error" + error)
    }finally{
      setIsLoading(false)
    }


  }

  const renderRatingPicker = () => {
    let stars = [];
    for(let i=1; i<=5;i++) {
      stars.push(
        <TouchableOpacity key={i} style={styles.starButton} onPress={()=>setRating(i)}>
          <Ionicons
          size={32}
          name= {i <= rating ? "star" : "star-outline"}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />

        </TouchableOpacity>
      )
    }

    return (
      <View style = {styles.ratingContainer}>{stars}</View>
    )
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    >
      <ScrollView style ={styles.scrollViewStyle} contentContainerStyle = {styles.container}>
        <View style = {styles.card}>


          <View style = {styles.header}>
            <Text style = {styles.title}>Add Book Recommendation</Text> 
            <Text style = {styles.subtitle}>Share your favourite read with others</Text>
          </View>

          <View style = {styles.form}>
            
            <View style = {styles.formGroup}>
              <Text style = {styles.label}>Book Title</Text>

              <View style = {styles.inputContainer}>
                <Ionicons name='book-outline' size={25} color={COLORS.primary}
                style = {styles.inputIcon}></Ionicons>
                <TextInput
                style = {styles.input}
                placeholder='Enter book title'
                maxLength={35}
                value={title}
                onChangeText={(val)=> setTitle(val)}
                placeholderTextColor={COLORS.placeholderText}
                >
                </TextInput>
              </View>
            </View>

            {/* Ratings */}
            <View style = {styles.formGroup}>
              <Text style = {styles.label}>Your Rating</Text>              
                {renderRatingPicker()}
              </View>


              {/* Image picker */}

            <View style = {styles.formGroup}>
              <Text style = {styles.label}>Choose your image</Text>              
              <View style={styles.imagePicker}>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image source={{uri : image}} style = {styles.previewImage}></Image>
                  ):(
                    <View style = {styles.placeholderContainer}>
                      <Ionicons name='image-outline' size={40} color={COLORS.textSecondary}></Ionicons>
                      <Text style= {styles.placeholderText}>Tap to select image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style = {styles.formGroup}>
                <Text style = {styles.label}>Caption</Text>
                <TextInput 
                style = {styles.textArea}
                placeholder='Write a review or thoughts about this book'
                value={caption}
                multiline = {true}
                onChangeText={(val)=> setCaption(val)}
                placeholderTextColor={COLORS.placeholderText}
                >
                </TextInput>
            </View>


            {/* Submit button */}

            <TouchableOpacity style = {styles.button} onPress={handleSubmit} disabled = {isLoading}>
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white}/>
                ):(
                  <Text style = {styles.buttonText}>Share</Text>
                )}
            </TouchableOpacity>




          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create