import ResturantCart, {withPromotedLabel} from "./ResturantCart";
import { useState , useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel } from "./ResturantCart";
import UserContext from "../utils/UserContext";


const Body = () =>{
    //Hook
    const [listOfResturant, setlistOfResturant] = useState ([]);

    const[FilteredRestaurant, setFilteredRestaurant] = useState([]);

   const [SearchText, setSearchText] = useState("");

   const PromotedLabel = withPromotedLabel(ResturantCart);

   const {setuserName , loggedUser} = useContext(UserContext);
   

    useEffect(() => {
        fetchdata();
    }, [])
    
    fetchdata = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9974533&lng=73.78980229999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);
        setlistOfResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    
    const online = useOnlineStatus();
    if(online === false) return <h1>Please Check Your Internet Connection</h1>

    if(listOfResturant.length === 0 ) return <Shimmer/> ; 
    console.log(listOfResturant.length)

    return (
        <div>
    <div className="search">
        <div className="flex p-4 gap-8 items-center">
            <div className="">
            <input type="text" className="border border-solid border-black rounded-md" 
            value={SearchText} 
            onChange={(e) => {
                setSearchText(e.target.value)
            }}/>
            </div>
            <button className="px-4 py-2 bg-red-300 rounded-md "  onClick={() => {
             const FilteredRes = listOfResturant?.filter((res) =>
                res?.data?.name.toLowerCase().includes(SearchText.toLowerCase())
            )[0];
            console.log(FilteredRes)
             setSearchText(FilteredRes);
            }}
            
            >Search</button>
            <button className="px-4 py-2 bg-blue-200 rounded-md"
                onClick={ () => {
                    const Filterlist = listOfResturant?.filter (
                        (res) => res.info.avgRating > 4.4
                    );
                    setFilteredRestaurant(Filterlist);
                 }}
            >
            Top Rated Resturants</button>
        </div>
        <div className="flex p-4 gap-8 items-center">
           <input  className="border border-black" value={loggedUser} onChange={(e) => setuserName(e.target.value)}/>
        </div>
        </div>
        <div className="flex flex-wrap ml-20">
             {FilteredRestaurant?.map((restaurants) => (
               <Link key={restaurants.info.id}  to ={ "/restaurant/" + restaurants.info.id}> 
               {restaurants.info.veg ? <PromotedLabel resData={restaurants}  /> : <ResturantCart  resData={restaurants} /> }
               
               </Link>
             ))}
        </div>
    </div>
)}

export default Body;