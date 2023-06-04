import imgError from '../../Images/error.svg';
export default  function NotFound(props) {
    

    return (
        <>
           <div className=' d-flex  justify-content-center align-items-center  p-5 ' >
             <img  src={imgError}  alt='NotFound' />
             
            </div> 
        </>
    )
}
