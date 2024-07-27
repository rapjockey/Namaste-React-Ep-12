import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";

const MenuList = ({items}) => {

    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        dispatch(addItems(item));
    }
 return(
        <div>
            {items?.map((item) => (
               <div key={item?.card?.info?.id} className="m-4 mx-4 p-4 text-left border-gray-300 border-b-2 ">
                   <div className="flex justify-between">
                   <div className=" w-9/12  ">
                        <span className="text-2xl font-bold">{item.card.info.name}</span> <br/>
                        <span className="text-xl font-bold"> ₹ {item.card.info.price / 100}</span>
                        <div>
                    <p className=" text-x">{item.card.info.description}</p>
                    </div>
                    </div>
                    <div className="w-3/12">
                        <div className=" absolute">
                            <button className="py-2 px-8 ml-6  shadow-lg font-bold bg-white text-green-700 border border-gray-400 rounded-lg "
                            onClick={() => handleAddItem(item)}
                            >Add+
                            </button>
                        </div>
                         <div className="my-4" >
                            <img src={CDN_URL + item.card.info.imageId} alt="" className="w-40 h-auto object-cover rounded-xl"/>
                        </div>
                     </div>
                   </div>
                 </div> 
            ))}
        </div>
    )
}
export default MenuList;