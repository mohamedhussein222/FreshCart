import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Brands from "./components/Brands/Brands";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import BrandProducts from "./components/BrandProducts/BrandProducts";
import { ToastContainer } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import  { Toaster } from 'react-hot-toast';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ContextStore, { dataContext } from "./Context/ContextStore";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import PaymentCredit from "./components/PaymentCredit/PaymentCredit";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import ProductCategory from "./components/ProductCategory/ProductCategory";
import { useContext } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Allorders from "./components/Allorders/Allorders";
import { Offline } from "react-detect-offline";




export default function App() {

  //  let [ user , setUser] = useState(null); 
  //    function getUserData(){
  //    let userData =  jwtDecode(localStorage.getItem('tkn')) ; 
  //    setUser(userData) ;  
  //    }
     
 
   
  const router = createBrowserRouter([
    {path : '', element : <Layout/>,children:[
      {path: "" , element:<Home/>},
      {path: "home" , element:<Home/>},
      {path: "navbar" , element:<NavBar />},
      {path : "productdetails/:id" , element : <ProductDetails/>},
      {path : "brandProducts/:id" , element :  <ProtectedRoute><BrandProducts/></ProtectedRoute>},
      {path : "forgotpassword" , element:< ForgotPassword/>},
      {path: "register"  ,element : <Register/>},
      {path : "brands" , element : <ProtectedRoute> <Brands/></ProtectedRoute>},
      {path : "cart" , element :  <ProtectedRoute><Cart/></ProtectedRoute>},
      {path : "verfiycode" , element : <VerifyCode/>} , 
      {path: "resetpassword" , element : <ResetPassword/>},
      {path : "payment" , element :  <ProtectedRoute><Payment/></ProtectedRoute>},
      {path : "products" , element : <ProtectedRoute> <Products/></ProtectedRoute>},
      {path : "paymentcredit" , element : <ProtectedRoute> <PaymentCredit/></ProtectedRoute>},
      {path : "Categories" , element :  <ProtectedRoute><Categories/></ProtectedRoute>},
     {path : "ProductCategory/:idProductCategory" ,element: <ProtectedRoute><ProductCategory/></ProtectedRoute>},
      {path : "allorders" , element :  <ProtectedRoute><Allorders  /></ProtectedRoute>},
      {path : "footer" , element : <Footer/>},
      {path : "login" , element : <Login   />},
      {path : "*" , element: <NotFound/>},

    ]}
  ]);

  return (
  
    <ContextStore>
    <ToastContainer theme="dark" />
    <Toaster  />
    
     <RouterProvider router={router} />
    </ContextStore>
   
  )
}
