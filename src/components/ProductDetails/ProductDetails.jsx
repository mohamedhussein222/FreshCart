

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import    styleDetails from  './ProductDetails.module.scss';
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../../Context/ContextStore";
import Slider from "react-slick";
import 'lightbox.js-react/dist/index.css';
import {SlideshowLightbox, initLightboxJS} from 'lightbox.js-react';
import LoadingProduct from "../LoadingProduct/LoadingProduct";


import {Helmet} from "react-helmet";


export default  function ProductDetails(props) {
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  //////////////////////
   let dataa= useContext(dataContext);
 const {id}= useParams();
  const [details ,setDetails]=  useState(null);

 const[productImages,setproductImages]=useState(null);
  async   function getProductDetails(){
    
    const {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) ; 
     setDetails(data.data);
     setproductImages(data.data.images);
     console.log(data.data)
    
     }
   useEffect(()=>{
    getProductDetails();
    initLightboxJS("Insert License key", "Insert plan type here");
   } , []);


    return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
              
            </Helmet>
       {details?  <div className="container py-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-3">
       
         <Slider {...settings} className="mb-5 "  >
      {details.images.map(function(imager){return <div>
       <img src={imager} className="w-100 "/>
      </div>})}
    

      </Slider>
       <div/>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center">
          <p>Availability: {details.quantity} in stock</p>
       
          <span  className="text-danger fs-3 wish" onClick={
            ()=>{
      
dataa.AddProductToWishlist(details.id);
            }}><i class="fa-regular fa-heart"></i></span>

          </div>
          <h6>{details.title}</h6>
         
          <p>{details.description}</p>
          {/* <h3>price: {details.price} EGP</h3> */}
   <div className="d-flex justify-content-between align-items-center">
   {details.priceAfterDiscount?<div className="d-flex ">
            <h5 className="text-decoration-line-through text-danger"> {details.price}</h5>
            <h5 className="mx-2"> {details.priceAfterDiscount} EGP</h5>
          </div>:<h3 > {details.price} EGP</h3>}
          <span className="d-flex "><i class="fas fa-star star-main px-1 fs-5"></i>
                        <h6 className="text-muted">{details.ratingsAverage}</h6></span>
   </div>
          <table class="table">
 
  <tbody>
    <tr>
      <th scope="row "className="table-light">category</th>
      <td className="table-success">{details.category.name}</td>
      
    </tr>
    <tr>
      <th scope="row"  className="table-light">brand</th>
      <td className="table-success">{details.brand.name}</td>
      
    </tr>
    
  </tbody>
</table>


        <button onClick={function(){
                   dataa.addProductToCart(details.id)
                  }} className=" w-100 btn btn-success text-white my-2 ">+ Add to cart</button>
        </div>
      </div>
     </div>: <LoadingScreen/>}
        </>
}
  
