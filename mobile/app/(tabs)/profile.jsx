import { View, Text, FlatList, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../assets/styles/profile.styles'
import ProfileHeader from '../../component/Profile/ProfileHeader'
import LogoutButton from '../../component/Profile/LogoutButton'
import {Image} from "expo-image"
import {Ionicons} from "@expo/vector-icons"
import { formatMongoDate } from '../../assets/utils/formatDate'
import COLORS from '../../constants/color'
import { API_URL } from '../../constants/api'
import { useAuthStore } from '../../store/authStore'

const Profile = () => {
  let {token} = useAuthStore();
  let [books,setBooks] = useState([]);
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
    }
  }

  let confirmDelete = (bookId) => {
    console.log(bookId)
    Alert.alert("Delete","Are you sure you want to delete ? ",[
      {text : "Cancel", style : "cancel", isPreferred : true},
      {text : "Delete" , style : "destructive", onPress : ()=> deleteBook(bookId)}
    ]);
  }

  useEffect(()=>setBooks([
    {"__v": 0, "_id": "6837c799a5703f2d5f06e34f", "caption": "Great book", "createdAt": "2025-05-29T02:34:01.419Z", "imageURL": "https://res.cloudinary.com/dailqmslk/image/upload/v1748486040/yzntgkslq175jmejcyod.jpg", "owner": {"_id": "6836f83da8d88adaac39a972", "profileImage": "https://api.dicebear.com/9.x/pixel-art/svg?seed=chetan", "username": "chetan"}, "rating": 4, "title": "new book", "updatedAt": "2025-05-29T02:34:01.419Z"}, {"__v": 0, "_id": "6837bba45db10b59f82ba453", "caption": "addsasdasdaaaaaaaaaaaaaaaaaaaaaaaa", "createdAt": "2025-05-29T01:43:00.317Z", "imageURL": "https://res.cloudinary.com/dailqmslk/image/upload/v1748482979/dgarhlgdlbc5tan4ay0y.jpg", "owner": {"_id": "6836f83da8d88adaac39a972", "profileImage": "https://api.dicebear.com/9.x/pixel-art/svg?seed=chetan", "username": "chetan"}, "rating": 5, "title": "sadsdsdss", "updatedAt": "2025-05-29T01:43:00.317Z"}, {"__v": 0, "_id": "6837b92f6300a546657728eb", "caption": "12121", "createdAt": "2025-05-29T01:32:31.051Z", "imageURL": "https://res.cloudinary.com/dailqmslk/image/upload/v1748482349/svcdv4tqqlcp5rnpj4a0.jpg", "owner": {"_id": "6836f83da8d88adaac39a972", "profileImage": "https://api.dicebear.com/9.x/pixel-art/svg?seed=chetan", "username": "chetan"}, "rating": 1, "title": "2112122121", "updatedAt": "2025-05-29T01:32:31.051Z"}, {"__v": 0, "_id": "6837b8d88108a2ce99072655", "caption": "Latest post", "createdAt": "2025-05-29T01:31:04.150Z", "imageURL": "https://res.cloudinary.com/dailqmslk/image/upload/v1748482263/rvszw0dd3l04cu9qpmth.jpg", "owner": {"_id": "6836f83da8d88adaac39a972", "profileImage": "https://api.dicebear.com/9.x/pixel-art/svg?seed=chetan", "username": "chetan"}, "rating": 1, "title": "chetann", "updatedAt": "2025-05-29T01:31:04.150Z"}
  ]),[]);

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
      ListEmptyComponent={<Text>Empty</Text>}
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
            <Ionicons name="trash-outline" color={COLORS.primary} size={20}/>
          </TouchableOpacity>
         
        </View>
      )}
      />


      
    </View>
  )
}

export default Profile