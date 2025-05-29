import { View, Text, FlatList, ActivityIndicator, RefreshControl} from 'react-native'
import {Image} from "expo-image"
import React, { useEffect, useState } from 'react'
import {useAuthStore} from "../../store/authStore"
import { API_URL } from '../../constants/api';
import style from "../../assets/styles/home.styles"
import { formatMongoDate } from '../../assets/utils/formatDate';
import COLORS from '../../constants/color';
import {Ionicons} from "@expo/vector-icons"


const Home = () => {
  let {token} = useAuthStore();
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [books, setBooks] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);

  let fetchBooks = async (pageNo, refresh = false) => {
    if(refresh) {setIsRefreshing(true); setBooks([])}
    else if(pageNo == 1) setIsLoading(true); 


    // console.log("Fetching books");
    try {
      setIsLoading(true);
      let response = await fetch(API_URL+"book?page="+pageNo+"&limit=2", {
        method : "GET",
        headers : {
          "Authorization" : "Bearer " + token
        }
      });
      let result = await response.json();
      // console.log("result");
      // console.log(result);
      if(result?.books) {
         setBooks((prev)=>([...prev,...result.books]));
        setHasMore(result.totalPages > pageNo);
        setPage(pageNo);
      }
      // console.log(books)

    } catch (error) {
      console.log(error);
    }finally{
      if(refresh) setIsRefreshing(false);
      setIsLoading(false);
    }
    
  }


  let handleLoadMore = async () =>{

    // console.log("hasmore chal rha h")
    if(hasMore && !isLoading && !isRefreshing){
      await fetchBooks(page+1);
      // console.log("chal rha hh actually")
    }
  }


  let renderItem = ({item})=>{
    return (
      <View style = {style.bookCard}>
        <View style = {style.bookHeader}>
          <View style = {style.userInfo}>
            <Image source={{uri : item.owner.profileImage}} style={style.avatar} ></Image>
            <Text style = {style.username}>{item?.owner.username}</Text>
          </View>
        </View>


        <View style={style.bookImageContainer}>
          <Image style={style.bookImage} source={{uri: item.imageURL}}></Image>
        </View>

        <View style = {style.bookDetails}>
        <Text style={style.bookTitle}>{item.title}</Text>
        <View style={style.ratingContainer}>{renderStarRatings({rating :item.rating})}</View>
        <Text style={style.caption}>{item.caption}</Text>

        <Text style={style.date}>{`Shared on ${formatMongoDate(item.createdAt)}`}</Text>
      </View>
        

      </View>
    )

  }


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
  useEffect(()=>{ fetchBooks(1);},[])
  // console.log("books");
  
  // console.log(books);
  return (
    <View style = {style.container}>
      <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle = {style.listContainer}
      showsVerticalScrollIndicator = {false}
      ListHeaderComponent={
        <View style= {style.header}>
          <Text style={style.headerTitle}>BookWorm 🐛</Text>
          <Text style={style.headerSubtitle}>Discover great reads from the community</Text>
        </View>
      }

      ListEmptyComponent={
        isLoading  ? (!isRefreshing ? <ActivityIndicator size={40} color={COLORS.textSecondary}/> : null ): (
        <View style ={style.emptyContainer}>
          <Ionicons name='book-outline' size={60}  color={COLORS.textSecondary}></Ionicons>
          <Text style={style.emptyText}>No Recommendation yet</Text>
          <Text style={style.emptySubtext}>Be the first to share a book !</Text>

        </View>)
      }

      ListFooterComponent={
        hasMore && books.length>0 ? <ActivityIndicator size={35} color={COLORS.textSecondary}/> : null
      }


      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}

      refreshControl={
        <RefreshControl refreshing = {isRefreshing}
          onRefresh={()=>fetchBooks(1,true)}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      


      />

      
      
    </View>
  )
}

export default Home
