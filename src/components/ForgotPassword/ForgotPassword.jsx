import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
export default  function ForgotPassword(props) {
  const navigate=    useNavigate(); 
 let [isLoading,setisLoading] =useState(false);
    const notify = (msg,type) => 
            toast[type](msg);
  async  function forgotPasswordApi(password){
      try {
        setisLoading(true);
        const {data} = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/forgotPasswords' , password) ; 
        console.log(data);
        if(data.statusMsg=='success'){
          setisLoading(false);
            notify(data.message ,data.statusMsg);
            navigate('/verfiycode');
        }
      } catch (error) {
        console.log(error)
        setisLoading(false);
      }
    }
    let formikForgot=  useFormik({
        initialValues: {
            email:'',
        },
        onSubmit:(values)=>{
        //  console.log(values)
         forgotPasswordApi(values) ; 
        },
        validate:(values)=>{
            let errors = {} ; 
             if(  ! values.email.includes('@')  ||values.email.includes('.com')== false ){
                errors.email="Email must be valid" ; 
             };
            
            
    
            return errors ; 
        }
    }); 
    return (
        <>
       <div className="container  py-5">
        <p>Please enter your email address. you will receive a verification code..</p>
        <form onSubmit={formikForgot.handleSubmit}>
            <label htmlFor="email">Email : </label>
        < input onBlur={formikForgot.handleBlur}   value={formikForgot.values.email}  onChange={formikForgot.handleChange}  className="form-control"  name="email"  id="email" type="email"  placeholder="email" />
      {formikForgot.errors.email&& formikForgot.touched.email ?  <div className="alert alert-danger text-center ">{formikForgot.errors.email}</div> : ''}
      {isLoading?<button type="button" className=" btn btn-success mt-3"><span className="fas fa-spinner fa-spin"></span></button>:<button type="submit" className="btn btn-success mt-2">Send Message</button>}
      
        </form>
       </div>
        </>
    )
}
