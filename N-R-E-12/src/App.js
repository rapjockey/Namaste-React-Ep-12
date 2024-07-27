import React, { lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error"; 
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//import Grocery from "./components/Grocery";
const Grocery = lazy(() => import ("./components/Grocery"));
const Main = () => {

   const [userName, setuserName] = useState();

   useEffect(() => {
    //Dummy Data
    const data = {
        name : "Rahul Jadhav"
    }
    setuserName(data.name);
   }, []);
   
    return (
        <Provider store={appStore}>
       <UserContext.Provider value={{loggedUser : userName, setuserName}}>
         <div>
            <Header/>
            <Outlet/>
        </div>
       </UserContext.Provider>
       </Provider>
    )
  }

  const RouterApp = createBrowserRouter ([
    {
        path : "/",
        element : <Main/>,
        children : [
            {
                path : "/",
                element : <Body/>
            },
            {
                path : "/about",
                element : <About/>
            },
           {
                path : "/contact",
                element : <Contact/>
           },
           {
            path : "/grocery",
            element : <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>
       },
           {
            path : "/restaurant/:ResId",
            element : <RestaurantMenu/>
       },
       {
        path : "/cart",
        element : <Cart/>
       },
        ],
        errorElement : <Error/>
    },
    
  ])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={RouterApp}/>)
