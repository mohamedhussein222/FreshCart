import { useContext, useEffect, useState } from "react"
import { dataContext } from "../../Context/ContextStore"
import axios from "axios"
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default  function WishList(props) {
  let [productWish,setproductWish] = useState(null);
    async function GetloggedUserWishlist (){
        try {
         let    {data}= await  axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
         headers:{"token":localStorage.getItem('tkn')},
        })
       //  if(data.status== 'success'){
       //   toast.success(data.message,{duration:4000,className:"text-success px-4 fw-bolder  "});
       //  }
        console.log(data)
        setproductWish(data.data)
        } catch (error) {
         console.log("err" ,error)
        }
       }
       
 let {user} = useContext(dataContext);
 useEffect(function(){
    GetloggedUserWishlist()
 },[])
    return (
        <>
        {productWish? <div className="container py-5 text-center ">
            <h5>Hello   in  Your Wish List</h5>
            <div className="row g-4">
            {productWish.map((Product)=>{return  <div className="col-md-2  col-6 animate__zoomIn animate__animated animate__bounce">
                   <Link to={`/productdetails/${Product.id}`} >
                   <div className="itemProducts  rounded position-relative ">
                
                    <img src={Product.imageCover} className="w-100" alt={Product.title}/>
                    <h6 className=" mt-3 px-3 text-success text-start ">{Product.title.split(' ').slice(0,2).join(' ')}</h6>
                    <h6 className="text-black px-3 mt-3 ">{Product.category.name}</h6>
                    <div class="d-flex px-3  justify-content-between align-items-center"><h6 className=" text-muted py-1">
                        <span>{Product.price} EGP</span></h6>
                        <span className="d-flex "><i class="fas fa-star star-main px-1 fs-5"></i>
                        <h6 className="text-muted">{Product.ratingsAverage}</h6></span>
                       
                    </div>
                    <button   className= {`btnProduct w-100 text-white btn btn-success rounded btn-lg border-0  p-2  `}>+ Add</button>
                    </div>
                   
                   </Link>
                  
                </div>
           })}
            </div>
            </div>:<LoadingScreen/>}
           
        </>
    )
}
