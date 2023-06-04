import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default  function Products(props) {
  let [AllProducts ,setAllProducts ]=  useState(null)
  async  function getAllProducts(){
      try {
        const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{
          params:{"category":"6439d5b90049ad0b52b90048"}
        });
        console.log(data.data)
        setAllProducts(data.data); 
      } catch (error) {
        console.log(error)
      }
    }
useEffect(()=>{
    getAllProducts();
},[])
    return (
        <>
          
          
          {AllProducts? <div className="container py-5">
             <div className="row g-4">
           {AllProducts.map((Product)=>{return  <div className="col-md-3  col-6 animate__zoomIn animate__animated animate__bounce  animate__delay-1s">
                   <Link to={`/productdetails/${Product.id}`}>
                   <div className="itemProducts p-1 rounded ">
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
            </div>:<LoadingScreen/> }
        </>
    )
}
