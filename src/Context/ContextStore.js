import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export let dataContext= createContext();
  export default  function ContextStore({children}) {
    let [ user , setUser] = useState(null);
   let [numProductCart,setnumProductCart]=useState(0);
    function getUserData(){
   let userData =  jwtDecode(localStorage.getItem('tkn')) ; 
     setUser(userData) ;  
     console.log(userData)
    }
    useEffect(function(){
      if(localStorage.getItem('tkn')!=null && user==null){
        getUserData();
      }
     },[])
  function clearUserData(){
      localStorage.removeItem('tkn');
       setUser(null); 
    } ; 
   async function addProductToCart (ProductId ){
   try {
    let {data} =  await axios.post('https://route-ecommerce.onrender.com/api/v1/cart' , {
      productId:ProductId , 
    },
   {headers : { 'token' : localStorage.getItem('tkn')}},
    ); 
    console.log(data);
    if(data.status == 'success'){
      toast.success(data.message,{duration:4000,className:"text-success px-4 fw-bolder"}); 
      setnumProductCart(data.numOfCartItems);
    }
   } catch (error) {
    console.log("errorCart : " , error);
    toast.error(error.response.data.message,{duration:4000,className:"text-success px-4 fw-bolder  "}); 
   }
    }




 
    async function GetLoggedusercart (){
      GetnumProductcart();
      try {
       return  await axios.get('https://route-ecommerce.onrender.com/api/v1/cart' , 
      {headers : { 'token' : localStorage.getItem('tkn')}},
       ); 
        
      } catch (error) {
       console.log("error GetLoggedusercart: " , error);
      }
      
       }

      async function GetnumProductcart (){
        try {
       let {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/cart' , 
        {headers : { 'token' : localStorage.getItem('tkn')}},
         ); 
         setnumProductCart(data.numOfCartItems);
          console.log(data.numOfCartItems);
        } catch (error) {
         console.log("error GetLoggedusercart: " , error);
        }
        
         }

      
  

    
 

async function RemovespecificcartItem(id){
  return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
    headers:{'token':localStorage.getItem('tkn')},
  })
}
async function Updatecartproductquantity(id , count){
  return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
    count:count
  },{
    headers:{'token':localStorage.getItem('tkn')},
  })
}
    return (
        <dataContext.Provider value={{user,getUserData,numProductCart,clearUserData,addProductToCart,GetLoggedusercart,RemovespecificcartItem,Updatecartproductquantity}}>
            {children}
        </dataContext.Provider>
    )
}
