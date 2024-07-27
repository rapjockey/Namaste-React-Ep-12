import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () =>{
   
    const [LogBtn , setLogbtn] = useState ("Login")
    const online = useOnlineStatus();
    const {loggedUser} = useContext(UserContext);
   const cartItmes = useSelector((store) => store.cart.items);
   console.log(cartItmes)
    return (
       <div className="flex justify-between bg-gray-200 px-3 m-2 ">
            <div className=" flex p-4 m-2 items-center">
                <img className="w-28 rounded-full" src={LOGO_URL}/>
            </div>
            <div className="">
                <ul className="flex p-4 m-2 items-center">
                    <li className="m-5">Online Status : {online ? "✅" : "🔴"} </li>
                    <li className="m-5"> <Link to="/">Home</Link></li>
                    <li className="m-5"> <Link to="/about">About</Link></li>
                    <li className="m-5"> <Link to="/contact">Contact</Link></li>
                    <li className="m-5"> <Link to="/grocery">Grocery</Link></li>
                    <li className="m-5 font-bold text-xl">
                    <Link to="/cart">Cart ({cartItmes.length} Items)</Link>
                        
                    </li>
                    <button className="login-btn"
                        onClick={() => {
                        LogBtn === "Login" ?  setLogbtn("Log Out") : setLogbtn("Login");
                        }}
                    >{LogBtn}
                    </button>
                    <li className="m-5 font-bold">{loggedUser}</li>
                </ul>
                {/* <li>{loggedUser}</li> */}
            </div>
        </div>
    )
}
export default Header;