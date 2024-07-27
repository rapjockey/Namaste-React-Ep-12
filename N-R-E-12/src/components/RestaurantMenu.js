import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { RESMENU_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";



const  RestaurantMenu = () => {
    const [resMenu, setResMenu] = useState(null);
    const {ResId} = useParams([]);

    const [ShowIndex, setShowIndex] = useState(1);

    useEffect(() => {
        fetchMenu();
    },[]);
    const fetchMenu = async () => {
        const data =  await fetch( RESMENU_URL + ResId );
        const json = await data.json();

        console.log(json);
        setResMenu(json?.data);
    };

    if (resMenu === null) return <Shimmer/>;

//    const {name,city,costForTwoMessage }= resMenu?.cards[2]?.card?.card?.info;

//    const {itemCards} = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

const info = resMenu?.cards[2]?.card?.card?.info ?? {};
const { name, city, costForTwoMessage } = info;

const {itemCards} = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card ?? [];

   const categories = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => 
        c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
   );
//    console.log(categories);
    return (
       <div className="text-center">
           <div className="ResMenu">
           <h1 className="font-bold text-4xl m-2">{name}</h1>
            <h4 className="font-bold">{costForTwoMessage}</h4>
            <p className="font-bold">{city}</p>
            {categories.map((category,index) =>
                ( <RestaurantCategory 
                 key={category?.card?.card?.title} 
                 data={category?.card?.card} 
                 itemList={index === ShowIndex ? true : false}
                setShowIndex = {()=>setShowIndex (index)}
                 />) )}
           </div>
        </div>
    )};

    

export default RestaurantMenu;