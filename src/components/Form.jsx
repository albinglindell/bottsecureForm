import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import "friendly-challenge/widget";
import FriendlyCaptcha from './Captcha';





function Form() {
    
    let [verified, setVerified] = useState(false)
    let honeypotVal = useRef()
    let emailVal = useRef()
    let firstnameVal = useRef()
    let lastnameVal = useRef()
    let messageVal = useRef()

    let sendFunc = (e)=>{
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

        e.preventDefault()
        if(!honeypotVal.current.checked && verified){
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
        }

    };

  return (
    <div> 
        <form>

                <h1>Albins bottsäkra bokningsformulär</h1>
                <div className="Honeypot">
                    <label htmlFor="honeyPot">Accept therms of service</label>
                    <input ref={honeypotVal} type="checkbox" id="honeyPot" />
                </div>
            <div>
                <label htmlFor="firstname">Firstname:</label>
                <input ref={firstnameVal} type="text" id='firstname' placeholder='John'/>
            </div>
            <div>
                <label htmlFor="lastname">Lastname:</label>
                <input ref={lastnameVal} type="text" id='lastname' placeholder='Doe'/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input ref={emailVal} type="text" id='email' placeholder='Johndoe72@email.com'/>
            </div>
            <div className='messageContainer'>
                <label htmlFor="message">Message:</label>
                <textarea ref={messageVal} id="message" cols="30" rows="10" placeholder='Your message here'></textarea>
            </div>
            <button onClick={sendFunc}>Send message</button>
            <FriendlyCaptcha setVerified={setVerified}/>
        </form>
       
    </div>
  )
}

export default Form