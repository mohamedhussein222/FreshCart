import { useContext, useState } from "react"
import { dataContext } from "../../Context/ContextStore"
import { useFormik } from "formik"
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export default  function PaymentCredit(props) {
 let { user} = useContext(dataContext);
       async function CreateCreditOrder(id ,values){
  
    try {
    const {data}= await   axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${id}`,values,{
        headers:{"token":localStorage.getItem('tkn')},
        params:{'url':'https://mohamedhussein222.github.io/FreshCart/allorders'}
       })
      console.log(data);
      if(data.status=='success'){
        window.open(data.session.url);
        console.log(data.session.url)
      }
    } catch (error) {
      console.log(error)
    }
     
   
   } 
  const formPaymentCredit =  useFormik({
    initialValues:{
        "details": "",
        "phone": "",
        "city": ""
        },
        onSubmit:function(values){
         console.log( localStorage.getItem("id"),values); 
    
        
         CreateCreditOrder(localStorage.getItem("id"),values )
        }
})

    return (
        <>
               <div className="container  w-50 py-5">
               <h3 className="text-center bg-light text-dark py-3">Hello  </h3>

           <form onSubmit={formPaymentCredit.handleSubmit }>
           <label htmlFor="details" className="mt-3">Address Details : </label>
            <input onChange={formPaymentCredit.handleChange} onBlur={formPaymentCredit.handleBlur} value={formPaymentCredit.values.details} className="form-control mt-1" placeholder="Address Details" id="details" name="details" type="text"></input>
            <label htmlFor="phone" className="mt-3">Phone : </label>
            <input  onChange={formPaymentCredit.handleChange}  onBlur={formPaymentCredit.handleBlur} value={formPaymentCredit.values.phone} className="form-control mt-1" placeholder="phone" id="phone" name="phone" type="tel"></input>
            <label htmlFor="city" className="mt-3">City : </label>
            <input onChange={formPaymentCredit.handleChange}  onBlur={formPaymentCredit.handleBlur} value={formPaymentCredit.values.city} className="form-control mt-1" placeholder=" city" id="city" name="city" type="text"></input>
  
        <button  type="submit" className="btn btn-success mt-3">Confirm Payment Cash</button>
          
        
           </form>  

            </div>  
        </>
    )
}
