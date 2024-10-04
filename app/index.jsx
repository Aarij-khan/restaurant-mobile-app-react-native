import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-blue-500 text-xl" onPress={()=>router.push('/home')}>Hello Tailwind!</Text>
  </View>
  );
}
