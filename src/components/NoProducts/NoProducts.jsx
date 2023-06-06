import imgNoProducts from '../../Images/no-product-found.586b20ff4a41075a2c4e.png';
import {Helmet} from "react-helmet";

export default  function NoProducts(props) {


    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>No Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
             <div className=' d-flex  justify-content-center align-items-center p-1 ' >
             <img  src={imgNoProducts} className='w-100' alt='NotFound' />
             
            </div> 
        </>
    )
}
