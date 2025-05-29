import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/profile.styles'
import {useAuthStore} from "../../store/authStore"
import {Image} from "expo-image"
import { formatMongoDate } from '../../assets/utils/formatDate'

const ProfileHeader = () => {
    let {user} = useAuthStore();


    // console.log(user);
    if(!user) return null;

    return (
        <View style={styles.profileHeader}>
            <Image source={{uri : user.profileImage}} style={styles.profileImage}></Image>
            <View>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.memberSince}>📅 Joined {formatMongoDate(user.createdAt)}</Text>
            </View>
        </View>
    )
}

export default ProfileHeader