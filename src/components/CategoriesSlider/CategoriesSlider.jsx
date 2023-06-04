
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
export default  function CategoriesSlider(props) {
 const[categories , setcategories] =useState([]);
   async function getCategoriesSlider(){
   try {
    const {data}= await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/categories`);
 setcategories(data.data);
   } catch (error) {
    console.log(error)
   }
    }
    useEffect(function(){

        getCategoriesSlider();
    },[])
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true,
      };

    return (
        <>
            <div className="container ">
                <h4 className="">Shop Popular Categories</h4>
           
      
        <Slider {...settings} autoplaySpeed={2000} >
         {categories.map((item)=>{return <div >
            <Link to={`/ProductCategory/${item._id}`}>
            <img src={item.image} className="w-100 " height={150} />
            <h6 className="py-2 text-center text-dark lead">{item.name}</h6>
            </Link>
         </div>
        
        })}
        </Slider>
  
            </div> 
        </>
    )
}
