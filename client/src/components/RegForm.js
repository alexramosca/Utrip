import React from 'react';
import axios from 'axios'

import '../App.css';
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const RegForm = () => {
    const phonePattern = /^(\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4}|\(\d{3}\)[-.\s]\d{3}[-.\s]\d{4})$/
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        /*email: yup.string().email().required().test("is-available", "Email not available", async (value)=>{
            try {
                const response = await axios.post(
                  `${process.env.REACT_APP_API_BASE_URL}/users/checkEmail`,
                  { email: value },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
        
                const responseData = response.data;
        
                if (!responseData.isAvailable){
                    return false
                }
                else {
                   
                    return true
                }
            }
            catch(err){
                console.log(err)
            }
        }),*/
        password: yup.string().required().min(6),
        confPassword: yup.string().oneOf([yup.ref("password"), null]).required(),
        phone: yup.string().matches(phonePattern),
        addressLine1: yup.string().required(),
        addressLine2: yup.string(),
        postalCode: yup.string().matches(postalCodePattern).required(),
        city: yup.string().required(),
        country: yup.string().required()
    })
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data, e) => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/users/register', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(response.ok){
        alert("user created");
        window.location.href="/login"
    }
    
    
    
    

  };

  return (
    <form id="regForm" onSubmit={handleSubmit(onSubmit)}>
     <input {...register('firstName')} type="text" placeholder="First Name" required /><br />
      <span className="formErrorMsgs">{errors.firstName?.message}</span>

      <input {...register('lastName')} type="text" placeholder="Last Name" required /><br />
      <span className="formErrorMsgs">{errors.lastName?.message}</span>

      <input {...register('email')}  type="email" placeholder="Email" required /><br />
      <span className="formErrorMsgs">{errors.email?.message}</span>

      <input {...register('password')} type="text" placeholder="Password" required /><br />
      <span className="formErrorMsgs">{errors.password?.message}</span>

      <input {...register('confPassword')} type="text" placeholder="Confirm Password" required /><br />
      <span className="formErrorMsgs">{errors.confPassword?.message}</span>

      <input {...register('phone')} type="tel" placeholder="Phone" required /><br />
      <span className="formErrorMsgs">{errors.phone?.message}</span>

      <input {...register('addressLine1')} type="text" placeholder="Address Line 1" required /><br />
      <span className="formErrorMsgs">{errors.addressLine1?.message}</span>

      <input {...register('addressLine2')} type="text" placeholder="Address Line 2" /><br />

      <input {...register('postalCode')} type="text" placeholder="Postal Code" required /><br />
      <span className="formErrorMsgs">{errors.postalCode?.message}</span>
      
      <input {...register('city')} type="text" placeholder="City" required /><br />
      <span className="formErrorMsgs">{errors.city?.message}</span>

      <select {...register('province')} required>
  <option value="AB">Alberta</option>
  <option value="BC">British Columbia</option>
  <option value="MB">Manitoba</option>
  <option value="NB">New Brunswick</option>
  <option value="NL">Newfoundland and Labrador</option>
  <option value="NS">Nova Scotia</option>
  <option value="NT">Northwest Territories</option>
  <option value="NU">Nunavut</option>
  <option value="ON">Ontario</option>
  <option value="PE">Prince Edward Island</option>
  <option value="QC">Quebec</option>
  <option value="SK">Saskatchewan</option>
  <option value="YT">Yukon</option>
</select><br />
   
      <input {...register('country')} type="text" placeholder="Country" required /><br />
      <span className="formErrorMsgs">{errors.country?.message}</span>

      <input type="submit" />
    </form>
  );
};
