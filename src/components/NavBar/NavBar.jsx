import { Link, useNavigate } from "react-router-dom"
import style from './NavBar.module.scss' ; 
import logo from '../../Images/freshcart-logo.png'
import { dataContext } from "../../Context/ContextStore";
import { useContext, useEffect, useState } from "react";
import { data } from "jquery";
import axios from "axios";

export default  function NavBar() {
  const navigate =  useNavigate();
  let dataa= useContext(dataContext);
 let {numProductCart,wish}= useContext(dataContext);
     function logOut(){
      dataa.clearUserData();
        navigate('/Login'); 
     }

//      useEffect(function(){
//       GetloggedUserWishlist()
//      },[])

    return (
        <>
                    <div className="mb-5">
                     <nav className="navbar navbar-expand-lg position-fixed fixed-top   ">
  <div className="container">
    <Link className="navbar-brand  "to="home">
      <img src={logo} alt="logo" className={style.logo}/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  d-flex  justify-content-center align-items-center ">
     
     <li className="nav-item">
       <Link className="nav-link"to="home">Home</Link>
     </li>
     {dataa.user?<><li className="nav-item">
       <Link className="nav-link"to="cart">Cart</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link"to="products">Products</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link"to="Categories">Categories</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link"to="Brands">Brands</Link>
     </li></>:""}
     
   
    
   </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0  d-flex  justify-content-center align-items-center  ">
     {dataa.user? <>
     <li className="nav-item position-relative">
      <Link className="nav-link" to="cart">
        <li className="fas fa-shopping-cart fa-lg"></li>
        <span className="badge position-absolute top-0 end-0 text-white bg-success">{numProductCart}</span>
      </Link>
     </li>
     <Link className="nav-link  position-relative" to="/WishList">
     
     <span  className="text-danger fs-5 wish"><i class="fa-regular fa-heart"></i></span>
     <span className="badge position-absolute top-0 end-0 text-white bg-success">{wish}</span>
     </Link>
     <li className="nav-item">
          <Link className="nav-link fs-5"to="https://www.linkedin.com/in/mohamed-elbahnasy-b1184126b/"><i class="fa-brands fa-linkedin"></i></Link>
        </li>
     <li className="nav-item">
          <Link className="nav-link fs-5"to="https://github.com/mohamedhussein222/"><i class="fa-brands fa-github"></i></Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link"to="allorders">All Orders</Link>
        </li>
        <li className="nav-item">
          <span  onClick={logOut}  className="nav-link ">Logout</span>
        </li>
     </> : <>

     <li className="nav-item">
          <Link className="nav-link fs-5"to="https://www.linkedin.com/in/mohamed-elbahnasy-b1184126b/"><i class="fa-brands fa-linkedin"></i></Link>
        </li>
     <li className="nav-item">
          <Link className="nav-link fs-5"to="https://github.com/mohamedhussein222/"><i class="fa-brands fa-github"></i></Link>
        </li>
     <li className="nav-item">
          <Link className="nav-link"to="Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to="register">Register</Link>
        </li>
     
     </>}
        
       
   
      
       
      </ul>
   
    </div>
  </div>
</nav>  
            </div>
        </>
    )
}
