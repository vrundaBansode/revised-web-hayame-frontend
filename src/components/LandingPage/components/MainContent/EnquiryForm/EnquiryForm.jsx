import React from 'react'
import "./enquiryForm.css"

const EnquiryForm = () => {
  return (
    <div className='enquiry-form-div'>
        <div className='enquiry-form-card'>
            <h3 className='enquiry-form-header'>Get in Touch!</h3>
            <div className='enquiry-div'>
                <form className='enquiry-form'>
                    <input type='text' name='enquiry-name' placeholder='Name' />
                    <input type='text' name='enquiry-business-name' placeholder='Business Name' />
                    <input type='email' name='enquiry-email' placeholder='Email'/>
                    <input type='tel' name='enquiry-phone' placeholder='Phone Number'/>
                    <input type='text' name='enquiry-city' placeholder='City'/>
                    <input type='text' name='enquiry-business-nature' placeholder='Nature of Business'/>
                    <input type='text' name='enquiry-skill' placeholder='Service Needed'/>
                    <input type='submit' name='enquiry-submit' className='enquiry-btn' value='SUBMIT'/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EnquiryForm