// import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider from "react-slick";
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import "swiper/css/pagination";



// import required modules
import { Navigation } from "swiper";
export default  function HomeSlider(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay:false,
      };
   
    return (
        <>
        
          <div className="container py-4">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src={require('../../Images/grocery-banner-2.jpeg')} className='w-100'/></SwiperSlide>
        <SwiperSlide>  <img src={require('../../Images/slider-2.jpeg')}  className='w-100'/></SwiperSlide>
        <SwiperSlide><img src={require('../../Images/grocery-banner.png')}  className='w-100'/></SwiperSlide>
        <SwiperSlide> <img src={require('../../Images/slider-2.jpeg')} className='w-100'/></SwiperSlide>
        <SwiperSlide><img src={require('../../Images/grocery-banner-2.jpeg')}  className='w-100'/></SwiperSlide>
      
      </Swiper>
          {/* <Slider {...settings} autoplaySpeed={2000} >
       <img src={require('../../Images/slider-image-1.jpeg')} height={200} className='w-100'/>
     
       
      
       
       <img src={require('../../Images/slider-2.jpeg')}height={200}  className='w-100'/>
        </Slider> */}
          </div>

   
       
          
           
            
        </>
    )
}
