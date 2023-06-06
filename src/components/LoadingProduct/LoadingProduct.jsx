import Style from './LoadingProduct.module.scss';
export default  function LoadingProduct(props) {
    
    return (
        <>
       <div className=" d-flex  justify-content-center  align-items-center bg-white  position-fixed top-0 start-0 bottom-0 end-0 ">
      
      
         <span className={Style.loader}></span>
            </div>   
        </>
    )
}
