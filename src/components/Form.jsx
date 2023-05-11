import React, {  useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import "friendly-challenge/widget";
import FriendlyCaptcha from './Captcha';
import { useNavigate } from 'react-router-dom';




function Form() {
    const allowedReferrers = 'http://localhost:3000/';
    const navigate = useNavigate()
    let [verified, setVerified] = useState(false)
    let honeypotVal = useRef()
    let emailVal = useRef()
    let firstnameVal = useRef()
    let lastnameVal = useRef()
    let messageVal = useRef()

    function isRefererValid() {
        let referrer = document.referrer;
        console.log(referrer)
          if (referrer === allowedReferrers) {
            return true;
          }
        
        return false;
      }
    let sendFunc = (e)=>{

        let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        e.preventDefault()
        let email =  emailVal.current.value
        let firstname =  firstnameVal.current.value
        let lastname = lastnameVal.current.value
        let message =  messageVal.current.value

      
        var templateParams = {
            email,
            firstname,
            lastname,
            message
        };
        if(!email.match(mailformat)){
            alert("Wrong email input.")
        }else{
            if(!honeypotVal.current.checked && verified && isRefererValid() && firstname && lastname && message){
                emailjs.send('service_jmqxk3i', 'template_yd4w6ec', templateParams, "kMi5D9DgjqxUwzDKN")
                .then(function(response) {
                   console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                   console.log('FAILED...', error);
                });
                emailVal.current.value = ""
                firstnameVal.current.value= ""
                lastnameVal.current.value= ""
                messageVal.current.value= ""
                navigate("/sent")
            }
        }


    };

  return (
    <div className='form'> 

        <form>

                <h1>Albins bottsäkra bokningsformulär</h1>
                <div className="thermsOfService">
                    <label htmlFor="thermsOfService">Accept therms of service</label>
                    <input required ref={honeypotVal} type="checkbox" id="thermsOfService" />
                </div>
            <div>
                <label htmlFor="firstname">Firstname:</label>
                <input required ref={firstnameVal} type="text" id='firstname' placeholder='John'/>
            </div>
            <div>
                <label htmlFor="lastname">Lastname:</label>
                <input required ref={lastnameVal} type="text" id='lastname' placeholder='Doe'/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input required ref={emailVal} type="text" id='email' placeholder='Johndoe72@email.com'/>
            </div>
            <div className='messageContainer'>
                <label htmlFor="message">Message:</label>
                <textarea required ref={messageVal} id="message" cols="30" rows="10" placeholder='Your message here'></textarea>
            </div>
            <button onClick={sendFunc}>Send message</button>
        </form>
        <FriendlyCaptcha setVerified={setVerified}/>
       
    </div>
  )
}

export default Form