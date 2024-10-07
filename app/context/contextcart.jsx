import { createContext, useState } from 'react'
import React from 'react'

export const contextcart= createContext();

const ContextcartProvider = ({children}) => {
    const [Cart, setCart] = useState([]);
    console.log("🚀 ~ ContextcartProvider ~ Cart:", Cart)

    const handleAddToCart = (item) => {
        console.log("🚀 ~ handleAddToCart ~ item:", item)
        let arr = Cart;
        let ItemIndex = arr.findIndex((i)=>i.id===item.id)
        if (ItemIndex == -1) {
            arr.push({ ...item, quantity: 1 });
          } else {
            arr[ItemIndex].quantity++;
          }
        setCart([...arr])
      };

      const handleRemoveFromCart = (id) => {
        let arr = Cart;
        let itemIndex = arr.findIndex((i)=>i.id==id);
        arr.splice(itemIndex, 1);
     
        setCart([...arr]);
      };
      const itemIsAddedToCart = (id) => {
        let arr = Cart;
        let itemIndex = Cart.findIndex((i)=>i.id==id);
        if (itemIndex == -1) {
            return null;
        }else{
            return arr[itemIndex].quantity;
        }
        
      };
      const decreaseItem = (id) => {
        let arr = Cart;
        let idx = arr.findIndex((i)=>i.id==id);
          arr[idx].quantity--;
          setCart([...arr]);
      };
  return (
    <contextcart.Provider value={{ Cart, setCart,handleAddToCart,handleRemoveFromCart,itemIsAddedToCart,decreaseItem}}>
    {children}
  </contextcart.Provider>
  )
}

export default ContextcartProvider
// add to cart page
//  onbourding screens,
//  search functionality ,
//  carosel
