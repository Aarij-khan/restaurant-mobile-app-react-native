import { useContext, useState } from "react";
import { View, Text, SafeAreaView ,TouchableOpacity, Pressable} from "react-native";
import React, { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { contextcart } from "./context/contextcart";

const Productdetail = () => {
  const  {Cart,handleRemoveFromCart,handleAddToCart,itemIsAddedToCart} = useContext(contextcart)
  const router = useRouter();
  const [data, setData] = useState([]);
  const params = useLocalSearchParams();
  const productId = params.id;
  console.log("🚀 ~ Productdetail ~ params:", productId);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)
        setData([data]);
      });
  }, [productId]);
  return (
    <SafeAreaView>
        <Ionicons
          name="chevron-back-circle-sharp"
          size={50}
          color="black"
          style={{
            position: "absolute",
            top: 40,
            left: 15,
            zIndex: 1,
            backgroundColor: "orange",
            borderRadius: 50,
          }}
          onPress={() => router.back()}
        />
    
      <View>
        {data.map((item) => (
        
          
          <View key={item.id}>
            <Image source={{ uri: item.image }} className="h-[300px] w-full" />
            <View className="rounded-t-3xl bg-gray-300  h-[62%] flex justify-start ">
            <Text className="text-2xl mx-4 text-center mt-4 font-semibold">{item.name}</Text>
            <Text className="text-lg mx-4 text-center mt-2 font-semibold">price : {item.prepTimeMinutes}$</Text>
            <Text className="text-lg mx-4 text-gray-600 mt-4 ">cuisine : {item.cuisine}</Text>
            <Text className="text-lg mx-4 text-gray-600 mt-2 ">servings: {item.servings} persons</Text>
            <Text className="text-lg mx-4 text-gray-600 mt-2 ">totalcalories: {item.caloriesPerServing}</Text>

            <Text className="text-[17px] mx-4  mt-6  text-gray-600">Ingredients : {item.ingredients[0]}...</Text>
            <TouchableOpacity>
              <Text className="text-[19px] rounded-full bg-orange-500 p-5 mx-4  mt-10 text-center text-gray-600" onPress={()=>handleAddToCart(item)}>{itemIsAddedToCart(item.id) ?  `${itemIsAddedToCart(item.id)} added `    :'Add to cart'}</Text>
            </TouchableOpacity>
              
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Productdetail;
