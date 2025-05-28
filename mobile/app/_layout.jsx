import { Stack } from "expo-router";
import SafeScreen from "@/component/SafeScreen.jsx"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{headerShown:false}}> 
          <Stack.Screen name="index"></Stack.Screen>
          <Stack.Screen name="(auth)"></Stack.Screen>

        </Stack>
        <StatusBar style="dark"/>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
