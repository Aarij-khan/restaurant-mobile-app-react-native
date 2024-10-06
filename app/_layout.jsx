import { Stack } from "expo-router";
import ContextcartProvider from "./context/contextcart";

export default function RootLayout() {
  return (
      <ContextcartProvider>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="home" />
      <Stack.Screen name="productdetail" options={{headerShown:false,animation:"slide_from_bottom"}} />
    </Stack>
      </ContextcartProvider>
  );
}
