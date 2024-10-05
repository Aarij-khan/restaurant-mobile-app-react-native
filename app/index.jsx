import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, TextInput, View,TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ItemList from "./itemlist";
import Itemrender from "./itemrender";
import Thirdrow from "./thirdrow";
import { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState([]); 
  const [row, setRow] = useState([]);
  const [row2, setRow2] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
     .then((res) => res.json())
     .then((data) => {
      setData(data.recipes);
      setRow(data.recipes.slice(8));
      setRow2(data.recipes.slice(15));
       
       
     });
 }, []);   
  const router = useRouter()
  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
     <ScrollView >
    <View className=' items-center mt-10'>
      <View className="h-[47px] w-[90%] border border-gray-600  flex-row rounded-full flex items-center pl-2">
      <View className="flex-row items-center">
      <AntDesign name="search1" size={24} color="black" />
      <TextInput placeholder="Enter restaurant" className='w-[140px] ml-2 '/>

      </View>
      <View  className="border-l border-gray-600   flex-row items-center pr-3">
      <Feather name="map-pin" size={24} color="orange" style={{paddingLeft:6}}/>
      <Text className='ml-1'>New york, NYC</Text>
      </View>

      </View>
    </View>
    <View>
      
    </View>
    <View className="flex mt-10 flex-row justify-between items-center mx-5">
      <View>
      <Text className="font-bold text-xl">Hot and Spicy</Text>
      <Text className=" text-md">local fast food corner</Text>
      </View>
      <TouchableOpacity>
        <Text className="font-bold text-md text-orange-400">See All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      {data.map((e,idx)=><ItemList 
      props={e}
      key={idx}
      />)}
    </ScrollView>
    <View className="flex mt-10 flex-row justify-between items-center mx-5">
      <View>
      <Text className="font-bold text-xl">Chinese Cusine</Text>
      <Text className="text-md">Chinese food corner</Text>
      </View>
      <TouchableOpacity>
        <Text className="font-bold text-md text-orange-400">See All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      {row.map((t,idx)=><Itemrender 
      props={t}
      key={idx}
      />)}
    </ScrollView>
    <View className="flex mt-10 flex-row justify-between items-center mx-5">
      <View>
      <Text className="font-bold text-xl">Itailian food</Text>
      <Text className="text-md">local food corner</Text>
      </View>
      <TouchableOpacity>
        <Text className="font-bold text-md text-orange-400">See All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
      {row2.map((t,idx)=><Thirdrow 
      props={t}
      key={idx}
      />)}
    </ScrollView>
  
    </ScrollView> 
    </SafeAreaView>
  );
}
//  extra code
{/* <ScrollView horizontal showsHorizontalScrollIndicator={false} >
{arr.map((e,idx)=><ItemList 
props={e}
key={idx}
/>)}
</ScrollView> */}