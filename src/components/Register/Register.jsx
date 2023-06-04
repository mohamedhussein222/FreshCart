import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';



export default  function Register(props) {
   let [isloading,setisloading] =useState(false);
    const notify = (msg,type) => 
    toast[type](msg);
    const navigate = useNavigate();

   async function registerUser(dataUser){
    setisloading(true);
    try {
        let {data} = await  axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup ' , dataUser ) ; 
        console.log(data) ; 
      
        if(data.message == 'success'){
            setisloading(false)
            notify("Success","success");
       navigate('/login');
      
        }
    } catch (error) {
        console.log(error.response.data.message);
        setisloading(false)
        notify(error.response.data.message,"error");
       
    }
   }
     let user={
        name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",

     } 
let  formik=  useFormik({
    initialValues: user , 
    onSubmit:function( values){
    registerUser(values) ; 
    },
    validate:(values)=>{
        let errors = {} ; 
         if(values.name.length < 3 || values.name.length > 10){
            errors.name="Name must be more than 3 charactres and less than 10" ; 
         } ; 
         if(  ! values.email.includes('@')  ||values.email.includes('.com')== false ){
            errors.email="Email must be valid" ; 
         };
         if( ! values.phone.match(/^(02)?[0125][0-9]{8}/)){
            errors.phone=" Phone must be egyptain number" ; 
         } ;
         if(values.password.length< 6 || values.password.length > 12 ){
            errors.password="Password must be from 6 to 12 character only";
         } ; 
         if(values.password != values.rePassword){
            errors.rePassword="Password and rePassword not matched" ;
         } ;
        

        return errors ; 
    }
})
    return (
        <>
       <div className="container  py-5">
      <h5 > Registeration Form :</h5>
      <form  onSubmit={formik.handleSubmit} >
      <label  className="mt-2" htmlFor="name">Name : </label>
      <input  onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} className="form-control "  name="name"  id="name" type="text"  placeholder="name" />  
   {formik.errors.name && formik.touched.name ?    <div className="alert alert-danger text-center ">{formik.errors.name}</div> : ''}



      <label  className="mt-2 " htmlFor="email">Email : </label>
      < input onBlur={formik.handleBlur}   value={formik.values.email}  onChange={formik.handleChange}  className=" form-control  "  name="email"  id="email" type="email"  placeholder="email" />
      {formik.errors.email&& formik.touched.email ?  <div className="alert alert-danger text-center ">{formik.errors.email}</div> : ''}

      <label  className="mt-2" htmlFor="phone">Phone : </label>
      < input onBlur={formik.handleBlur} value={formik.values.phone}  onChange={formik.handleChange}  className=" form-control "  name="phone"  id="phone" type="tel"  placeholder="phone" />
      {formik.errors.phone && formik.touched.phone ?    <div className="alert alert-danger text-center ">{formik.errors.phone}</div> : ''}


      <label  className="mt-2" htmlFor="password">Password : </label>
      < input onBlur={formik.handleBlur} value={formik.values.password}  onChange={formik.handleChange}  className=" form-control "  name="password"  id="password" type="password"  placeholder="password" />
      {formik.errors.password && formik.touched.password ?    <div className="alert alert-danger text-center ">{formik.errors.password}</div> : ''}

      <label  className="mt-2" htmlFor="rePassword">rePassword : </label>
      < input onBlur={formik.handleBlur} value={formik.values.rePassword}  onChange={formik.handleChange}   className=" form-control "  name="rePassword"  id="rePassword" type="password"  placeholder="rePassword" />
      {formik.errors.rePassword && formik.touched.rePassword ?    <div className="alert alert-danger text-center ">{formik.errors.rePassword}</div> : ''}
      
      {isloading?<button type="button" className=" btn btn-success mt-3"><span className="fas fa-spinner fa-spin"></span></button>:<button type="submit"  className="btn btn-success mt-3"> Register</button>}
      </form>
       </div>
       
        </>
    )
}
