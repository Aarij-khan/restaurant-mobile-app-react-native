import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useContext ,useEffect, useState} from "react";
import { Image } from "expo-image";
import { contextcart } from "./context/contextcart";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.config/firebase";
import { useToast } from "react-native-toast-notifications";

const Addtocart = () => {
  const { Cart, handleRemoveFromCart, handleAddToCart, decreaseItem } =useContext(contextcart);
  const toast = useToast();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const total = Cart.reduce(
    (acc, item) => acc + item.prepTimeMinutes * item.quantity,
    0
  );
  
    const handlesend = async () => {
    if (Cart.length > 0) {
      try {
        setLoading(true);
        const orderData = {
          total: total,
          cartItems: Cart.map(item => ({
            image: item.image,  
            quantity: item.quantity,
            price: item.prepTimeMinutes,
            name: item.name, 
          })),
        };
        const docRef = await addDoc(collection(db, "order"), orderData);
        router.push("animating");
        setLoading(false);
        console.log("data gaya ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
        setLoading(false);
      }
    } else{
      toast.show("Cart is empty", {type:'warning', placement:'top', duration:3000, animationType:'zoom-in'});
    }
  };
 

  useEffect(() => {
    if (Cart == "") {
      toast.show("Cart is empty",{type:'warning',placement:'center',duration:3000,animationType:'zoom-in'});
    }
  }, []);
  return (
    <View className="flex-1 bg-white ">
      <Ionicons
        name="chevron-back-circle-sharp"
        size={35}
        color="black"
        style={{
          position: "absolute",
          top: 42,
          left: 15,
          zIndex: 1,
          borderRadius: 50,
        }}
        onPress={() => router.back()}
      />
      <Text className="text-orange-500 text-4xl mt-10 text-center pb-2 font-bold">
        Cart
      </Text>
      <ScrollView>
        {Cart &&
          Cart.map((Cart, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 200).springify()}
              key={index}
              className="flex flex-row h-[110px] mt-3 justify-between items-center mx-2"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: Cart.image }}
                  className="h-[100px] w-[90px] mt-2"
                />
                <View className="flex-col gap-2 ">
                  <Text className="text-xl pl-2 justify-center">
                    {Cart.name.length > 14
                      ? Cart.name.slice(0, 14) + "..."
                      : Cart.name}
                  </Text>
                  <Text className="text-xl pl-2 justify-center">
                    {Cart.prepTimeMinutes}$
                  </Text>
                  <View className="flex-row">
                    <TouchableOpacity>
                      <AntDesign
                        name="plus"
                        size={26}
                        color="black"
                        onPress={() => handleAddToCart(Cart)}
                        style={{
                          borderRadius: 50,
                          backgroundColor: "orange",
                          marginLeft: 10,
                        }}
                      />
                    </TouchableOpacity>
                    <Text className="border px-2  ml-2 text-xl">
                      {Cart.quantity}
                    </Text>
                    <TouchableOpacity>
                      <AntDesign
                        name="minus"
                        size={26}
                        color="black"
                        onPress={() => decreaseItem(Cart.id)}
                        disabled={Cart.quantity == 1}
                        style={{
                          borderRadius: 50,
                          backgroundColor: "orange",
                          marginLeft: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <AntDesign
                name="delete"
                size={30}
                color="black"
                onPress={() => handleRemoveFromCart(Cart.id)}
                style={{ marginRight: 10 }}
              />
            </Animated.View>
          ))}
      </ScrollView>
      <TouchableOpacity onPress={handlesend}>
        <View className="rounded-full bg-orange-500 mx-3 py-5 mb-2 px-4">
          
          {Loading ?
           <ActivityIndicator size={33} /> :
           <View className="flex-row flex justify-between">
            <Text className="text-xl font-bold">Total: {total}$</Text>
            <Text className="text-xl font-bold">Checkout</Text>
          </View>
            }
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Addtocart;
