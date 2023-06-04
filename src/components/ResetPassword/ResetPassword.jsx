import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  export default function ResetPassword(props) {
  let [isLoading,setisLoading]  = useState(false);
  let navigate=  useNavigate(); 
    let userReset={
        email:"",
        newPassword:"",
         } 
    let  formikResetPassword=  useFormik({
        initialValues: userReset, 
        onSubmit:function( values){
   console.log(values) ; 
   NewPassword(values) ; 
        },
        validate:(values)=>{
            let errors = {} ; 
            
             if(  ! values.email.includes('@')  ||values.email.includes('.com')== false ){
                errors.email="Email must be valid" ; 
             };
             if(values.newPassword.length< 6 || values.newPassword.length > 12 ){
                errors.newPassword="Password must be from 6 to 12 character only";
             } ; 
            return errors ; 
        }
    })
  async  function NewPassword(objNew){
   try {
    setisLoading(true)
    let {data} = await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword', objNew); 
    console.log(data);
    if(data.token){
        setisLoading(false);
       toast.success("Your Password Changed Successfully",{duration:4000,className:"text-success px-4 fw-bolder"});
navigate('/login');
    }
   } catch (error) {
    setisLoading(false);
    console.log('Error : ',error);
    toast.error(error.response.data.message,{duration:4000,className:"text-danger px-4 fw-bolder"});
   }
    }
    return (
        <>
              <div className="container py-5">
      <h5 className=""> Reset New Password :</h5>
      <form  onSubmit={formikResetPassword.handleSubmit} >
      


      <label  className="mt-3" htmlFor="email">Email : </label>
      < input onBlur={formikResetPassword.handleBlur}   value={formikResetPassword.values.email}  onChange={formikResetPassword.handleChange}  className="form-control"  name="email"  id="email" type="email"  placeholder="email" />
      {formikResetPassword.errors.email&& formikResetPassword.touched.email ?  <div className="alert alert-danger text-center ">{formikResetPassword.errors.email}</div> : ''}

      

      <label  className="mt-3" htmlFor="password"> New Password : </label>
      < input onBlur={formikResetPassword.handleBlur} value={formikResetPassword.values.newPassword}  onChange={formikResetPassword.handleChange}  className="form-control"  name="newPassword"  id="newPassword" type="password"  placeholder="New Password" />
      {formikResetPassword.errors.newPassword&& formikResetPassword.touched.newPassword?    <div className="alert alert-danger text-center ">{formikResetPassword.errors.newPassword}</div> : ''}
        {isLoading?<button type="button" className=" btn btn-success mt-3"><span className="fas fa-spinner fa-spin"></span></button>: <button type="submit"  className="btn btn-outline-success my-2 btn-md " > Update Password</button>}
     
      </form>
       </div>
        </>
    )
}
