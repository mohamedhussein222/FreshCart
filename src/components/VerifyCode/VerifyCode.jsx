import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default  function VerifyCode(props) {
   let [isloading ,setisloading] = useState(false);
  let navigate= useNavigate();
  let verifyCode = useFormik({
    initialValues : {
      "resetCode" : ""
    },
      onSubmit: function( values ){
      console.log('Submit',values);
      verifyPassword( values );
  }});
  async function verifyPassword(obj){
    setisloading(true);
    try {
      const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,obj)
      console.log(data);
      if(data.status === 'Success'){
        setisloading(false)
        toast.success('Success You can create a new Password',{duration:4000,className:"text-success px-4 fw-bolder"}); 
       navigate('/resetpassword');
      }
    } catch (error) {
      console.log('Error : ',error);
      toast.error(error.response.data.message,{duration:4000,className:"text-danger px-4 fw-bolder"});
      setisloading(false)
    }
  }

  return (
    <>
       <div className="container ">
     
     
      <form onSubmit={verifyCode.handleSubmit}>
        
        <label className='mt-3 fw-bolder' htmlFor="resetCode">Enter Reset Code</label>
        <input onChange={verifyCode.handleChange} onBlur={verifyCode.handleBlur}  id="resetCode" type="text" name='resetCode' placeholder='Enter Reset Code' className='form-control my-2'  />
        {verifyCode.errors.resetCode && verifyCode.touched.resetCode ?<div className='alert alert-danger text-center '>{ verifyCode.errors.resetCode }</div>:"" }
        
     {isloading?<button type="button" className=" btn btn-success mt-3"><span className="fas fa-spinner fa-spin"></span></button>:<button  type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Verify Code</button>}
          
      
    </form>
       </div>
    </>
  )
}
