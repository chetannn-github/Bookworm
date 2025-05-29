import { router, Stack, useSegments, usePathname } from "expo-router";
import SafeScreen from "@/component/SafeScreen.jsx"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthStore } from '../store/authStore'

export default function RootLayout() {
  let segments = useSegments();
  let pathname = usePathname();
  let {checkAuth, token, user, isLoading} = useAuthStore();

  let checkAuthentication = async () =>{ 
    await checkAuth();
  }

  useEffect(()=>{
    checkAuthentication();
  },[]);

  useEffect(()=>{
    if(isLoading) return;
    // console.log("token ->"  + token);
    
    let isSignedIn = token && user;
    let inAuthScreen = pathname ==='/' || segments[0] === "(auth)";
    // console.log("segments ")
    // console.log(segments)

    // if(!isSignedIn && !inAuthScreen) {
    //   router.replace("/(auth)/login");
    // }else if (isSignedIn && inAuthScreen) {
    //   router.replace("/(tabs)/home")
    // }
  },[segments,token,user, isLoading])
 

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{headerShown:false}}> 
          
          <Stack.Screen name="(auth)"></Stack.Screen>
          <Stack.Screen name="(tabs)"></Stack.Screen>
          

        </Stack>
        <StatusBar style="dark"/>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
