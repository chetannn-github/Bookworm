import {create} from "zustand";
import {API_URL} from "../constants/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    }
}))