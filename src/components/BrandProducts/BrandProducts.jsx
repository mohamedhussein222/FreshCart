import axios from "axios"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";
import styleHome from './BrandProducts.module.scss';
import NoProducts from "../NoProducts/NoProducts";

export default  function BrandProducts(props) { 
    const{id} = useParams();
   const [brandProduct ,setBrandProduct] =useState(null) ; 
async  function getBrandProductz(){
  try {
    const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products', {
        params : {"brand" :id},
    })
   setBrandProduct(data.data); 
  } catch (error) {
    console.log("Error : " , error)
  }

}
useEffect(function(){
  getBrandProductz()

},[])
    return (
        <>
     {brandProduct? <div className="container py-5">
            <div className="row g-4">
              {brandProduct.length==0?<NoProducts/>: brandProduct.map((Product)=>{return  <div className="col-md-2  col-6">
                  <Link to={`/productdetails/${Product.id}`}>
                  <div className="itemProducts  rounded ">
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
