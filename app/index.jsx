import { useRouter } from "expo-router";
import { SafeAreaView, Text, TextInput, View } from "react-native";
// import { search1 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter()
  return (
    <SafeAreaView>
    <View className='flex-1 items-center mt-10'>
      <View className="h-[47px] w-[90%] border border-gray-600 justify-between flex-row rounded-full flex items-center pl-2">
      <View className="flex-row">
      <AntDesign name="search1" size={24} color="black" />
      <TextInput placeholder="Enter resturant" className='pl-3 font-semibold w-[230px]'/>

      </View>
      <View  className="border-l border-gray-600 p-2 ">
      <Feather name="map-pin" size={24} color="orange" />
      </View>

      </View>
    </View>

    </SafeAreaView>
  );
}
