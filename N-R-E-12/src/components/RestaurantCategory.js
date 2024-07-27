import { useState } from "react";
import MenuList from "./MenuList";
const RestaurantCategory = ({data, itemList,setShowIndex}) => {

   const displayList = () => {
      setShowIndex();
   }
    // console.log(data);
   return(
    <div>
         {/*Header*/}
            <div className="w-7/12 bg-gray-100 mx-auto my-6 shadow-lg p-4  rounded-lg ">
            <div className="flex justify-between font-bold cursor-pointer " onClick={displayList}>
            <span >{data.title} ({data.itemCards.length})</span>
            <span>⬇️</span>
            </div>
            { itemList && <MenuList items={data.itemCards}/>}
            </div>
       
    </div>
   )
    
}
export default RestaurantCategory;