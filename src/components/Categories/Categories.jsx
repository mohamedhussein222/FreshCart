import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default  function Categories(props) {
  let [dataCategories,setdataCategories ] =  useState(null); 
  async function   GetAllCategories (){
 const {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`) ; 
 console.log("data Categories" , data.data);
 setdataCategories(data.data);
 }
 useEffect(function(){
    GetAllCategories();
 },[])
    return (
        <>
    {dataCategories?<div className="container py-5">
           <div className="row g-3 d-flex  justify-content-center  align-items-center">
            <div className="col-md-3 animate__zoomInLeft animate__animated animate__bounce animate__delay-1s">
                <div className="item">
                    <h1 className="text-success">Our Category</h1>
                    <p>You can see our categories and each category includes the products in it</p>
                </div>
            
            </div>
        {dataCategories.map(function(category){return <div className="col-md-3 col-6 animate__zoomIn animate__animated animate__bounce animate__delay-1s">
<Link to={`/ProductCategory/${category._id}`}>
<div className="itemCategory border rounded-1">
    <img src={category.image} alt={category.name} className="w-100  "/>
    <h5 className="text-center text-dark lead py-3">{category.name}</h5>
   
</div>
</Link>
</div>})} </div></div>:<LoadingScreen/>} 
        </>
    )
}
