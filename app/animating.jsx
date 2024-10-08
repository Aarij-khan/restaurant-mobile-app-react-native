import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext }  from 'react'
import LottieView from 'lottie-react-native'
import { useRouter } from 'expo-router'
import { contextcart } from './context/contextcart'


const Animating = () => {

    const {
        Cart,
        setCart
      } = useContext(contextcart);
    const router = useRouter();
    const handleGo = () => {
        router.push('/');
        setCart([]);

    }
  return (
    <View className="bg-white flex-1">
        <LottieView
        source={require("../assets/images/rider.json")}
        autoPlay
        loop
        style={{height:'100%',width:'100%'}}
        />
        <Text  className="absolute top-[67%] text-3xl font-bold mx-10">Your order has been successfully placed</Text>
        <TouchableOpacity  onPress={handleGo}  className="mx-12 absolute top-[80%] bg-teal-500 w-[250px] p-2 rounded-full border-2 border-white" >
        <Text className=" text-3xl font-bold text-center ">Done</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Animating