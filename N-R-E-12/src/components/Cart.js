import { useDispatch, useSelector } from "react-redux";
import MenuList from "./MenuList";
import { clearItems } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();
    const clearCart = () => {
        dispatch(clearItems());
    }

    
    return (
        <div className="text-center m-4 p-4">
            <h1 className="font-bold text-2xl">Cart</h1>
            <div className="w-6/12 m-auto">
                <div >
                    <button className=" m-2 p-2 text-red-500 font-bold bg-gray-200 rounded-lg "
                    onClick={clearCart}
                    >Clear Cart</button>
                </div>
                <MenuList items={cartItems}/>
            </div>
        </div>
    )
}
export default Cart;