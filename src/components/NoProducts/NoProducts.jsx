import imgNoProducts from '../../Images/no-product-found.586b20ff4a41075a2c4e.png';

export default  function NoProducts(props) {
    

    return (
        <>
             <div className=' d-flex  justify-content-center align-items-center p-1 ' >
             <img  src={imgNoProducts} className='w-100' alt='NotFound' />
             
            </div> 
        </>
    )
}
