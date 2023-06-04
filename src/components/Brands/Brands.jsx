import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default  function Brands(props) {

    let [AllBrands ,setAllBrands]=useState(null);
    async  function getAllBrands(){
     let {data} = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/brands`);
      setAllBrands(data.data)
     }
 useEffect(()=>{
    getAllBrands();
 },[])
    return (
        <>
         {AllBrands?   <div className="container py-4">
            <div className="row align-items-center g-4 ">
                <div className="col-md-3  animate__zoomInLeft animate__animated animate__bounce animate__delay-1s ">
                    <div className="item-Brand">
                    <h4 class="text-success fw-bolder">Our Brands</h4>
                    <p>you can see our brands and each brand included in it</p>
                    </div>
                </div>
               {AllBrands.map((brand,idx)=>{return  <div className="col-lg-3 col-md-6 col-6 animate__zoomIn animate__animated animate__bounce  animate__delay-1s" >
                   <Link to={`/brandProducts/${brand._id}`}>
                   <div className="item-Brand" key={idx}>
                        <img src={brand.image} alt={brand.name} className='w-100' />
                        <h6 className='lead text-dark  text-center'>{brand.name}</h6>
                    </div>
                   </Link>
                </div>})}
            </div>
          </div> : <LoadingScreen/>}
        </>
    )
}
