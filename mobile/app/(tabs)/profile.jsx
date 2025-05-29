import { View, Text, FlatList, Touchable, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import styles from '../../assets/styles/profile.styles'
import ProfileHeader from '../../component/Profile/ProfileHeader'
import LogoutButton from '../../component/Profile/LogoutButton'
import {Image} from "expo-image"
import {Ionicons} from "@expo/vector-icons"
import { formatMongoDate } from '../../assets/utils/formatDate'
import COLORS from '../../constants/color'
import { API_URL } from '../../constants/api'
import { useAuthStore } from '../../store/authStore'

import {router} from "expo-router"
import { sleep } from '../../assets/utils/sleep'

const Profile = () => {
  let {token,user} = useAuthStore();
  let [books,setBooks] = useState([]);
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [deleteBookId, setDeleteBookId] = useState(null);


  let renderStarRatings =  ({rating}) => {
    let stars = [];
    for(let i=1; i<=5;i++) {
      stars.push(
        <Ionicons  key={i}
        size={16}
        name= {i <= rating ? "star" : "star-outline"}
        color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      )
    }

    return stars;
  }
  let deleteBook = async(bookId)=>{
    setDeleteBookId(bookId)
    console.log("delete book started")
    try {
      let response = await fetch(API_URL + "book/" + bookId, {
        method : "DELETE",
        headers : {
          "Authorization" : "Bearer " + token,
        },
        
      });
      // console.log(response)
      let result = await response.json();
      console.log(result);
      setBooks((prev) => prev.filter((item)=> item._id !== bookId));

    } catch (error) {
      // Alert.alert("error", "Internal Server error");
      console.log("Error in deleting books " + error);
    } finally {
      setDeleteBookId(null);
    }
  }

  let confirmDelete = (bookId) => {
    console.log(bookId)
    Alert.alert("Delete","Are you sure you want to delete ? ",[
      {text : "Cancel", style : "cancel", isPreferred : true},
      {text : "Delete" , style : "destructive", onPress : ()=> deleteBook(bookId)}
    ]);
  }

  let fetchBooks = async ()=>{
    try {
      setIsRefreshing(true);
      await sleep(200);
      // console.log(user._id);
      let response = await fetch(API_URL + "book?userID=" + user._id, {
        headers : {
          "Authorization" : "Bearer " + token
        }
      });

      let result = await response.json();

      if(!result?.success) {
        Alert.alert("error", "Internal Server Error");
        return;
      }

      setBooks([...result.books]);

      // console.log(result);
    } catch (error) {
      console.log(error)
    }finally{
      setIsRefreshing(false)
    }
  }

  useEffect(()=>{fetchBooks()},[]);

  

  return (
    <View style={styles.container}>

      <ProfileHeader/>
      <LogoutButton/>

      <View style={styles.booksHeader}>
        <Text style= {styles.bookTitle}>Your Recommendations 📖</Text>
        <Text style={styles.booksCount}> {books.length} Books</Text>
      </View>

      <FlatList
      showsVerticalScrollIndicator = {false}
      data={books}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={
        <View style = {styles.emptyContainer}>
          <Ionicons size={50} color={COLORS.textSecondary} name='book-outline'/>
          <Text>No Recommendations</Text>
          <TouchableOpacity style = {styles.addButton} onPress={()=> router.push("/(tabs)/create")}>
            <Text style = {styles.addButtonText}>Add your first Book</Text>
          </TouchableOpacity>
        </View>
      }
      contentContainerStyle={styles.booksList}
      renderItem={({item})=>(
        <View style={styles.bookItem}>
          <Image style={styles.bookImage} source={{uri : item.imageURL}}/>

          <View style = {styles.bookInfo}>
            <Text style = {styles.bookTitle}>{item.title}</Text>
            <Text style = {styles.bookCaption}>{item.caption}</Text>
            <View style = {styles.ratingContainer}>{renderStarRatings({rating : item.rating})}</View>
            <Text style= {styles.bookDate}>{formatMongoDate(item.createdAt)}</Text>
          </View>

          <TouchableOpacity style= {styles.deleteButton} onPress={() => confirmDelete(item._id)}>
          {item._id === deleteBookId ? <ActivityIndicator size={20} color={COLORS.primary}/> : <Ionicons name="trash-outline" color={COLORS.primary} size={20}/>}
            
          </TouchableOpacity>
         
        </View>
      )}

      refreshControl={
        <RefreshControl  refreshing = {isRefreshing}
          onRefresh={fetchBooks}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      />


      
    </View>
  )
}

export default Profile