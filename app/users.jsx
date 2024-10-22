import { ActivityIndicator, ScrollView } from "react-native";
import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { contextcart } from "./context/contextcart";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { db } from "./firebase.config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const Users = () => {
  const {
    Cart,
  } = useContext(contextcart);
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const toast = useToast();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const total = Cart.reduce(
    (acc, item) => acc + item.prepTimeMinutes * item.quantity,
    0
  );

  const handleSubmit = async () => {
    if (input != "" && input1 != "" && input2 != "" && input3 != "") {
      try {
        setLoading(true);
        const orderData = {
          name: input,
          email: input1,
          address: input2,
          phone: input3,
          instruction: input3,
          total: total,
          cartItems: Cart.map((item) => ({
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
    }else{
        toast.show("Please fill all the fields",{type:'warning',placement:'center',duration:3000,animationType:'zoom-in'});
  
    }
  };
  return (
      <View className="flex-1 justify-center mt-6 ">
        <ScrollView showsVerticalScrollIndicator={false} >
        <View>

        <Image source={require('../assets/images/tick.gif')} className="h-[220px] w-[220px] mx-auto object-fill" />
        </View>
      <TextInput
        value={input}
        mode="outlined"
        label="Name"
        onChangeText={(text) => setInput(text)}
        className="mx-4  mt-2"
      />
      <TextInput
        value={input1}
        mode="outlined"
        label="Email"
        onChangeText={(text) => setInput1(text)}
        className="mx-4 mt-2"
      />
      <TextInput
        value={input2}
        mode="outlined"
        label="Address"
        onChangeText={(text) => setInput2(text)}
        className="mx-4 mt-2"
      />
      <TextInput
        value={input3}
        mode="outlined"
        label="+92-XXXXXXXXXX"
        onChangeText={(text) => setInput3(text)}
        className="mx-4 mt-2"
      />
      <TextInput
        value={input4}
        mode="outlined"
        label="Order instruction"
        onChangeText={(text) => setInput4(text)}
        className="mx-4 mt-2"
      />
      <TouchableOpacity onPress={handleSubmit} className="mx-4">
        {Loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16}} color="#00ff00" />
        ) : (
          <Text className="text-center text-xl font-bold text-white bg-green-500 p-4 rounded-xl mt-4 ">
            Place order
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default Users;
