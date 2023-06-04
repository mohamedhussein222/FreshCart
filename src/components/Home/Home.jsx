import axios from 'axios';
import styleHome from './Home.module.scss';
import { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { dataContext } from '../../Context/ContextStore';


export default  function Home(props) {
   let { addProductToCart} = useContext(dataContext); 
    let [allProduct , setAllProduct] = useState(null);
  async function getAllProduct(){

    let {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/products' , {
        params : {'sort' : 'title'},
    }); 
   setAllProduct(data.data); 
   }
 
   useEffect(function(){

    getAllProduct();
   },[]);
    return (
        <>
        
        <HomeSlider/>
       <CategoriesSlider/>
   {allProduct?    <div className="container py-2">
             <div className="row g-4">
           {allProduct.map((Product)=>{return  <div className="col-md-2  col-6 animate__zoomIn animate__animated animate__bounce">
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
            </div>  :<LoadingScreen/>}
        </>
    )
}
