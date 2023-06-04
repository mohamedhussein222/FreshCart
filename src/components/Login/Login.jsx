import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { dataContext } from "../../Context/ContextStore";
export default  function Login() {
    let [isloading, setisloading] = useState(false);
    let dataa= useContext(dataContext);
    console.log(dataa)
    const navigate = useNavigate();
    const notify = (msg,type) => 
    toast[type](msg);
   async function loginUser(dataUser){
    setisloading(true);
    try {
        let {data} = await  axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin ' , dataUser ) ; 
        console.log(data) ;  
        if(data.message == 'success'){
            setisloading(false);
        localStorage.setItem('tkn' , data.token);
        console.log(dataa.user)
        dataa.getUserData();
            notify("Welcome ","success");
       navigate('/home');
      
        }
    } catch (error) {
        // console.log(error);
        setisloading(false);
        notify(error.response.data.message,"error");
    }
   }
     let user={
    email:"",
    password:"",
     } 
let  formik=  useFormik({
    initialValues: user , 
    onSubmit:function( values){
    loginUser(values) ; 
    },
    validate:(values)=>{
        let errors = {} ; 
        
         if(  ! values.email.includes('@')  ||values.email.includes('.com')== false ){
            errors.email="Email must be valid" ; 
         };
         if(values.password.length< 6 || values.password.length > 12 ){
            errors.password="Password must be from 6 to 12 character only";
         } ; 
        return errors ; 
    }
})
    return (
        <>
       <div className="container py-5">
      <h5> Login Form :</h5>
      <form  onSubmit={formik.handleSubmit} >
      


      <label  className="mt-3" htmlFor="email">Email : </label>
      < input onBlur={formik.handleBlur}   value={formik.values.email}  onChange={formik.handleChange}  className="form-control"  name="email"  id="email" type="email"  placeholder="email" />
      {formik.errors.email&& formik.touched.email ?  <div className="alert alert-danger text-center ">{formik.errors.email}</div> : ''}

      

      <label  className="mt-3" htmlFor="password">Password : </label>
      < input onBlur={formik.handleBlur} value={formik.values.password}  type="password" onChange={formik.handleChange}  className="form-control"  name="password"  id="password"   placeholder="password" />
      {formik.errors.password && formik.touched.password ?    <div className="alert alert-danger text-center ">{formik.errors.password}</div> : ''}
        <Link to={'/forgotpassword'} ><span className="text-success  d-block">Forgot Your Password ?</span></Link>
        {isloading?<button type="button" className=" btn btn-success"><span className="fas fa-spinner fa-spin"></span></button>:<button type="submit"  className="btn btn-success mt-1 " > Login</button>}
        
      
      </form>
       </div>
        </>
    )
}
