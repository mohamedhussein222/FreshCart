import { useContext, useEffect ,useState} from "react"
import { dataContext } from "../../Context/ContextStore"
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NoProducts from "../NoProducts/NoProducts";

export default  function Cart(props) {
  let {GetLoggedusercart,GetIdcart ,RemovespecificcartItem,Updatecartproductquantity } =   useContext(dataContext);
 
  let navigatePayment =   useNavigate();
 let [numOfCartItems,setnumOfCartItems]=useState(0);
 let [totalCartPrice ,settotalCartPrice]=useState(0);
 let [products, setproducts]=useState([]);

    async function getCart(){
   let response =   await GetLoggedusercart();
 
   console.log(response);


   if(response.data.status=='success'){
    setnumOfCartItems(response.data.numOfCartItems);
    settotalCartPrice(response.data.data.totalCartPrice);
    setproducts(response.data.data.products);
    localStorage.setItem("id",response.data.data._id);
   
   }
 
   
    }
   useEffect(function(){
    getCart();
   },[]); 
   
  async function getRemove(id){
    try {
      let responseRemove = await RemovespecificcartItem(id);
console.log(  responseRemove);
if(responseRemove.data.status=='success'){
  setnumOfCartItems(responseRemove.data.numOfCartItems);
  settotalCartPrice(responseRemove.data.data.totalCartPrice);
  setproducts(responseRemove.data.data.products);
  toast.success("The product has been successfully deleted",{duration:4000,className:"text-success px-4 fw-bolder"}); 

 }
    } catch (error) {
      console.log(error)
    }
  }
  async function updateCount(id,count){
    try {
      let responseCount = await Updatecartproductquantity(id,count);
console.log(  responseCount);
if(responseCount.data.status=='success'){
  setnumOfCartItems(responseCount.data.numOfCartItems);
  settotalCartPrice(responseCount.data.data.totalCartPrice);
  setproducts(responseCount.data.data.products);
  toast.success("Product Count Updated",{duration:4000,className:"text-success px-4 fw-bolder"}); 

 }
    } catch (error) {
      console.log(error)
    }
  }
    return <>
   
   {products?  <div className="container py-5">
    <div className="bg-light p-5 text-success fw-bolder animate__rotateInDownLeft animate__animated animate__bounce " >
            <h4 className="text-center my-2" >Shop Cart</h4>
            <h6>Total Cart Price :<span className="text-dark"> {totalCartPrice} EGP</span></h6>
            <h6>Number of Cart Items:<span className="text-dark"> {numOfCartItems} Products</span></h6>
            </div>
            <div className="row">
        { products.map((pro)=>{return <div className="col-md-12 bg-light gy-2 d-flex justify-content-center align-items-center animate__zoomIn animate__animated animate__bounce  animate__delay-1s ">
      <div className="col-md-1 col-4  ">
<img src={pro.product.imageCover} className="w-100"/>
<div className="py-2">
<button onClick={function(){
    updateCount(pro.product._id,pro.count -1)
}} className="btn btn-outline-danger ">-</button>
          <span className="fw-bolder mx-2">{pro.count}</span>
          <button onClick={function(){
            updateCount(pro.product._id,pro.count +1)
          }} className="btn btn-outline-success ">+</button>
</div>
      </div>
      <div className="col-md-11 mx-2 ">
        <div>
        <h6>{pro.product.title}</h6>
    
        <h6> Price : <span className="text-success">{pro.price}</span> EGP</h6>
        <button  onClick={function(){
          getRemove(pro.product._id);
        }} className="btn b-0 m-0 text-danger ">Remove<i className="fa-regular text-danger fa-trash-can"></i></button>
        </div>
        
      </div>
     </div>
})}

            <button  onClick={()=>{
              navigatePayment('/payment')
            }}  className="btn btn-outline-success m-auto w-25 fw-bolder my-2 ">Confirm</button>

          </div>
    </div> : <LoadingScreen/>}
    
    
    
    </>
    
           
          
    
   
        
   
    
}
