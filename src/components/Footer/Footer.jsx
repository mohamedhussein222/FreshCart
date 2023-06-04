 import styleFooter  from './Footer.module.scss';
 import express from './../../Images/express.svg' ; 
 import amazon from '../../Images/amazonpay.svg' ;
 import masterCard from '../../Images/mastercard.svg';
  
 
export default  function Footer(props) {
    

    return (
        <>
          <footer>
             <div className="container p-4 my-5 ">
                <div className="row  justify-content-between align-items-center ">
                    <div className="col-md-12">
                        <h3>Get The FreshCart App</h3>
                        <p>We Will Send You A Link, Open It On Your Phone To Download The App</p>
                    </div>
                    <div className="col-md-9  ">
                        <input className=' form-control  ' placeholder='Enter Your Email...'/>
                    </div>
                    <div className="col-md-3">
                       <button type='button' className='btn btn-success btn-lg my-2' >Share App Link</button>
                    </div>
                </div>
             </div>
             <div className="container border-bottom border-top border-2 border-dark py-4 d-flex align-items-center justify-content-between">
        <div className="row">
            <div className="leftPart d-flex align-items-center jusify-content-center">
              <div className="col-md-6 d-flex align-items-center jusify-content-center">
              <h6 className='pe-4'>Payment Partners</h6>
                <img src={require('../../Images/amazonpay.png')} style={{'width':'15%'}} className='pt-4' alt={'amazonpay'} />
                <img src={require('../../Images/americanexpress.png')} style={{'width':'10%'}} alt={'americanexpress'} />
                <img src={require('../../Images/mastercard.png')} style={{'width':'10%'}} alt={'mastercard'} />
                <img src={require('../../Images/paypal.png')} style={{'width':'15%'}} alt={'paypal'} />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <h6 className='text-muted'>Get deliveries with FreshCart</h6>
                <img src={require('../../Images/googleplay.png')} className='w-25' alt={'googleplay'} />
                <img src={require('../../Images/appstore.png')} className='w-25' alt={'appstore'} />
              </div>
          </div>
        </div>
      </div>
            <div className="copy-right">
            <p _ngcontent-yyv-c24="" class="m-0 text-center py-4 "> dev/ By Mohamed elbahnasy All Rights Reserved</p>
            </div>
            
            
            
            </footer>  
        </>
    )
}
