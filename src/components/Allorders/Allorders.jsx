import axios from "axios"
import { useContext, useState } from "react";
import { useEffect } from "react";
import { dataContext } from "../../Context/ContextStore";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default  function Allorders(props) {
   let {user}= useContext(dataContext);
   let [allProduct,setallProduct] =useState(null)
 async function getAllOrders(){
try {
    let {data}  = await  axios.get(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${user.id}`);
    setallProduct(data);
    console.log(data)
} catch (error) {
    console.log(error)
}
     }

    useEffect(function(){
        getAllOrders();
    },[])
    return (
        <>
  {allProduct?  <div className="container py-4">
    <h3 className="text-center bg-light text-success">Hello {user.name}</h3>
      <div className="row">
        {allProduct.map(function(all){return <div className=".col-md-12">   <table  class="table table-hover table-success table-bordered animate__zoomIn animate__animated animate__bounce  animate__delay-1s">
 
 <tbody>
   <tr>
     <th scope="row table-active">Total Order Price</th>
     <td className="table-secondary">{all.totalOrderPrice} EGP</td>
     
   </tr>
   <tr>
     <th scope="row">paymentMethodType</th>
     <td className="table-secondary">{all.paymentMethodType}</td>
     
   </tr>

   <tr>
     <th scope="row">createdAt</th>
     <td className="table-secondary">{all.createdAt}</td>
     
   </tr>
  
 </tbody>
</table>
</div>

})}

{/* <div className="col-md-3">
{all.cartItems.map(function(pro){return <div>
<img src={pro.product.imageCover} className="w-100"/>

            <h6 className="text-black px-3 mt-3 ">{pro.product.title.slice(0,40)}</h6>
            <h6 className="text-black px-3 mt-3 ">{pro.product.category.name}</h6>
            <div class="d-flex px-3  justify-content-between align-items-center"><h6 className=" text-muted py-1">
                <span>{pro.price} EGP</span></h6>
                <span className="d-flex "><i class="fas fa-star star-main px-1 fs-5"></i>
                <h6 className="text-muted">{pro.product.ratingsAverage}</h6></span>
            </div>
</div>})}
</div>  */}
      </div>
    </div>
         :<LoadingScreen/>}
       
        </>
    )
}





