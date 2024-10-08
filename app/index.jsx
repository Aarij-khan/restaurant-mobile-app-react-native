import { Link, useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ItemList from "./itemlist";
import Itemrender from "./itemrender";
import Thirdrow from "./thirdrow";
import { useContext, useEffect, useState } from "react";
import { Badge } from "react-native-paper";
import { contextcart } from "./context/contextcart";
import { Image } from "expo-image";

export default function Index() {
  // const [input, setInput] = useState("");
  const { Cart } = useContext(contextcart);
  const [data, setData] = useState([]);
  const [row, setRow] = useState([]);
  const [row2, setRow2] = useState([]);
  const [loading, setloading] = useState(false);
  // const [orginalData, setorginalData] = useState([]);
  useEffect(() => {
    try {
      setloading(true);
      fetch("https://dummyjson.com/recipes")
        .then((res) => res.json())
        .then((data) => {
          setData(data.recipes);
          setRow(data.recipes.slice(8));
          setRow2(data.recipes.slice(15));
          // setorginalData(data.recipes);
          setloading(false);
        });
    } catch (error) {
      alert(error.message);
      setloading(false);
    }
  }, []);
  const router = useRouter();

  if (loading) {
    return (
      <ActivityIndicator size={70} color={"orange"} className="mt-[380px]" />
    );
  }
  // const handleInput = (text) => {
  //   setInput(text.toLowerCase());
  //   const filteredData = orginalData.filter((item) =>{
  //     return item.name.toLowerCase().includes(input)
  //   })
    
  //   setData(filteredData)
    
  // };


  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
      <ScrollView>
        <View className="ml-2 mt-10">
          <View className="h-[47px] w-[85%] border border-gray-600  flex-row rounded-full flex items-center pl-2">
            <View className="flex-row items-center">
              <AntDesign name="search1" size={24} color="black" />
              <TextInput
                placeholder="Enter restaurant"
                className="w-[125px] ml-2 "
                // onChangeText={(e)=>handleInput(e)}
                // value={input}
              />
            </View>
            <View className="border-l border-gray-600   flex-row items-center pr-3">
              <Feather
                name="map-pin"
                size={28}
                color="orange"
                style={{ paddingLeft: 2 }}
              />
              <Text className=""> New york, NYC</Text>
            </View>

            <TouchableOpacity onPress={() => router.push("/addtocart")}>
              <Badge className=" absolute top-[-12px] right-[-5px]">
                {Cart.length}
              </Badge>
              <AntDesign
                name="shoppingcart"
                size={30}
                color="black"
                style={{ marginRight: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Swiper
          showsButtons={true}
          className="h-[270px] border-2 mt-2 bg-red-300"
          autoplay={true}
        >
          <Image
          source={{uri:'https://i.pinimg.com/550x/85/b0/db/85b0dbf498014dafb43e001a6e2471ef.jpg'}}
          className="flex-1 object-cover"
          />
          <Image
          source={{uri:'https://i.pinimg.com/736x/03/35/14/03351403ae27d274e94f1383358f003a.jpg'}}
          className="flex-1 object-cover"
          />
          <Image
          source={{uri:'https://images.pexels.com/photos/28787817/pexels-photo-28787817/free-photo-of-assorted-gourmet-brazilian-brigadeiros.jpeg?auto=compress&cs=tinysrgb&w=600'}}
          className="flex-1 object-cover"
          />
        </Swiper>

        <View className="flex mt-5 flex-row justify-between items-center mx-5 mb-4">
          <View>
            <Text className="font-bold text-xl">Hot and Spicy</Text>
            <Text className=" text-md">local fast food corner</Text>
          </View>
          <TouchableOpacity>
            <Text className="font-bold text-md text-orange-400">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* <ItemList/> */}

          {data.map((e, idx) => (
            <Link href={`/productdetail?id=${e.id}`} className="ml-4">
              <ItemList props={e} key={idx} />
            </Link>
          ))}
        </ScrollView>
        <View className="flex mt-5 flex-row justify-between items-center mx-5 pb-5">
          <View>
            <Text className="font-bold text-xl">Chinese Cusine</Text>
            <Text className="text-md">Chinese food corner</Text>
          </View>
          <TouchableOpacity>
            <Text className="font-bold text-md text-orange-400">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {row.map((t, idx) => (
            <Link href={`/productdetail?id=${t.id}`} className="ml-4">
              <Itemrender props={t} key={idx} />
            </Link>
          ))}
        </ScrollView>
        <View className="flex mt-5 pb-4 flex-row justify-between items-center mx-5">
          <View>
            <Text className="font-bold text-xl">Itailian food</Text>
            <Text className="text-md">local food corner</Text>
          </View>
          <TouchableOpacity>
            <Text className="font-bold text-md text-orange-400">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-4"
        >
          {row2.map((t, idx) => (
            <Link href={`/productdetail?id=${t.id}`} className="ml-4">
              <Thirdrow props={t} key={idx} />
            </Link>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
//  extra code
{
  /* <ScrollView horizontal showsHorizontalScrollIndicator={false} >
{arr.map((e,idx)=><ItemList 
props={e}
key={idx}
/>)}
</ScrollView> */
}
