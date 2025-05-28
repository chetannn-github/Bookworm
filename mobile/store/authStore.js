import {create} from "zustand";
import {API_URL} from "../constants/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const useAuthStore = create((set)=>({
    user : null,
    token : null,
    isLoading : false,
    
    register : async (username, email, password) =>{
        set({isLoading : true})
        
        try {
            const response = await fetch(API_URL+"auth/signup",{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({username,email,password})
            });
            
            const result = await response.json();
            console.log(result)
            if(!result?.success) {
                return {error : result.message}
            }

            await AsyncStorage.setItem('token', result.token);
            await AsyncStorage.setItem('user', JSON.stringify(result.user));

            set({token : result.token, user : result.user});
            

        } catch (error) {
            console.log("error in signup");
            return {error : "Internal server error"}
        } finally{
            set ({isLoading : false})
        }
    },

    logout : async () => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");

            set({user : null , token : null, isLoading : false})

        } catch (error) {
            console.log(error)
            Alert.alert("error" , "error in logout")
        }
    },

    login : async (username, password) => {
        // console.log(username,password);

        set({isLoading : true})
        
        try {
            const response = await fetch(API_URL+"auth/login",{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({username,password})
            });
            
            const result = await response.json();
            console.log(result)
            if(!result?.success) {
                return {error : result.message}
            }

            await AsyncStorage.setItem('token', result.token);
            await AsyncStorage.setItem('user', JSON.stringify(result.user));

            set({token : result.token, user : result.user});
            

        } catch (error) {
            console.log("error in signup");
            return {error : "Internal server error"}
        } finally{
            set ({isLoading : false})
        }
    },
    
    checkAuth : async () => {
        try {
            set ({isLoading : true});
            let token = await AsyncStorage.getItem("token");
            let userJSON = await AsyncStorage.getItem("user");
            let user = userJSON ? JSON.parse(userJSON) : null;

            console.log("user -> "+ user);

            set({user,token});
            
            return true;
        } catch (error) {
            console.log(error);
        }finally{
            set({isLoading : false});
        }
       
    }


}))