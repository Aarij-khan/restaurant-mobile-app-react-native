import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { AntDesign } from '@expo/vector-icons';

const Itemrender = ({props}) => {
  return (
    <View className="h-[240px] w-[230px] ml-4 mt-5 rounded-3xl shadow-lg bg-gray-200">
        <Image
        source={{uri:props.image}}
        className='h-[160px] w-full rounded-tl-3xl rounded-tr-3xl'
        />
      <Text className="text-[19px] pl-4 font-bold pt-1">{props.name.length > 15 ? props.name.slice(0,20)+"...":props.name}</Text>
        <View className="flex-row ml-4 pt-1 ">
        <AntDesign name="staro" size={18} color="orange" />
        <Text className="text-[15px] pl-1  ">({props.rating}.k) reviews</Text>

        </View>

    </View>
  )
}

export default Itemrender