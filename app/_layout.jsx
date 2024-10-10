import { Stack } from "expo-router";
import ContextcartProvider from "./context/contextcart";
import { ToastProvider } from 'react-native-toast-notifications'

export default function RootLayout() {
  return (
    <ToastProvider>
      <ContextcartProvider>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="home" />
      <Stack.Screen name="productdetail" options={{headerShown:false,animation:"slide_from_bottom"}} />
      <Stack.Screen name="addtocart" options={{headerShown:false,animation:"slide_from_bottom"}} />
      <Stack.Screen name="animating" options={{headerShown:false,animation:"slide_from_bottom"}} />
    </Stack>
      </ContextcartProvider>
      </ToastProvider>
  );
}
