import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
const ResturantCart = (props) =>{
    const {resData} = props;
    const {cloudinaryImageId, name, cuisines, costForTwo, avgRating } = resData?.info;
    const {deliveryTime} = resData?.info?.sla;

    const {loggedUser} = useContext(UserContext)
    return (
        <div className="m-10 p-4 w-64 hover:bg-gray-200  ">
        <div className=" transition-all duration-75">
          <img className="rounded-xl w-80 h-[149px] object-cover" 
          src={ CDN_URL + cloudinaryImageId} />
           <h3 className="font-bold text-lg">{name}</h3>
           <h4 className="overflow-hidden text-ellipsis">{cuisines.join(",")}</h4>
           <h4>{costForTwo}</h4>
           <h4>{avgRating} Rating</h4>
           <h4>{deliveryTime} minutes</h4>
           <h4 className="font-bold">User : {loggedUser}</h4>
        </div>
        </div>
    )   
};
 /******** Higher Order Component   *********/ 
export const withPromotedLabel = (ResturantCart) => {
    return (props) => {
        return(
           <div>
             <label className="absolute bg-gray-800 text-white rounded-md p-1 m-4">Promoted</label>
             <ResturantCart {...props}/>
           </div>
        );
    };  
}
export default ResturantCart;