import { useContext, useState } from "react"
import { dataContext } from "../../Context/ContextStore"
import { useFormik } from "formik"
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export default  function Payment(props) {
  let [isLoading,setisLoading] =  useState(false);

  let {user}= useContext(dataContext);
   async function CreateCashOrder(id ,values){
    setisLoading(true);
       try {
        
        const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${id}`,values,{
            headers:{"token":localStorage.getItem('tkn')},
          })
          console.log(data)
          if(data.status=='success'){
            setisLoading(false);
            toast.success(`The order was created successfully and Payment upon receipt and totalOrderPricet = ${data.data.totalOrderPrice}`,{duration:5000,className:"text-success px-4 fw-bolder"}); 
          }
       } catch (error) {
        console.log("error payment" ,  error);
        setisLoading(false)
       }

      
    
    } 
    //////////////////
  //   async function CreateCreditOrder(id ,values){
  
  //   try {
  //   const {data}= await   axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${id}`,values,{
  //       headers:{"token":localStorage.getItem('tkn')},
  //       params:{'url':'http://localhost:4200'}
  //      })
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
     
   
  //  } 


   const formPayment =  useFormik({
    initialValues:{
        "details": "",
        "phone": "",
        "city": ""
        },
        onSubmit:function(values){
         console.log( localStorage.getItem("id"),values); 
         CreateCashOrder( localStorage.getItem("id"),values);
     
        }
})
    return (
        <>
          <div className="container   py-5">
            <h3 className="text-center bg-light text-dark py-3">Hello  </h3>
<h6 >To pay by visa,<Link className="text-success" to="/paymentcredit"> click here</Link></h6>
           <form onSubmit={formPayment.handleSubmit }>
           <label htmlFor="details" className="mt-3">Address Details : </label>
            <input onChange={formPayment.handleChange} onBlur={formPayment.handleBlur} value={formPayment.values.details} className="form-control mt-1" placeholder="Address Details" id="details" name="details" type="text"></input>
            <label htmlFor="phone" className="mt-3">Phone : </label>
            <input  onChange={formPayment.handleChange}  onBlur={formPayment.handleBlur} value={formPayment.values.phone} className="form-control mt-1" placeholder="phone" id="phone" name="phone" type="tel"></input>
            <label htmlFor="city" className="mt-3">City : </label>
            <input onChange={formPayment.handleChange}  onBlur={formPayment.handleBlur} value={formPayment.values.city} className="form-control mt-1" placeholder=" city" id="city" name="city" type="text"></input>
  
          {isLoading?<button type="button" className=" btn btn-success mt-3"><span className="fas fa-spinner fa-spin"></span></button>:<button  type="submit" className="btn btn-success mt-3">Confirm Payment Cash</button>
}
       
           </form>  

            </div>  
        </>
    )
}
