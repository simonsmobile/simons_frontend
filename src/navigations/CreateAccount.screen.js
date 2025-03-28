import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import axios from 'axios';
import env from '../configs/env';

const CreateAccount = () => {
  const [email, setEmail] = useState(localStorage.getItem('username') || '');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    //const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return re.test(String(password));
  };

  const validateContact = (contact) => {
    return contact.length === 10;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const sendOTP = async (mobile, code) => {
    const message = `Your OTP code is ${code}.`;
    await fetch(`https://app.notify.lk/api/v1/send?user_id=23201&api_key=aElC8iVmQG05Aqk60tWj&sender_id=NotifyDEMO&to=+94${mobile.substring(1)}&message=${message}`)
      .then((response) => {
        console.log(response);
      });
  };

  const submitOTP = async (otp) => {
    
    try {
      const response = await fetch(env.SERVER_URL + '/auth/account-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        Notiflix.Notify.success('OTP was sent to your email');
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    }
  };

  const submitAction = (event) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      Notiflix.Notify.failure('Invalid email address');
      return;
    }

    if ( !email || !password || !dob || !gender || !country) {
      Notiflix.Notify.failure('All fields are required');
      return;
    }

    // if (!validateContact(contactNumber)) {
    //   Notiflix.Notify.failure('Contact Number needs to be 10 characters');
    //   return;
    // }

    if (password !== retypePassword) {
      Notiflix.Notify.failure('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      Notiflix.Notify.failure('Password must be at least 8 characters and include uppercase, lowercase, digit, and special character');
      return;
    }

    if (!agreement) {
      Notiflix.Notify.failure('You must accept the agreement');
      return;
    }
    console.log("Hii");
    // If all validations pass
    axios.post(`${env.SERVER_URL}/auth/register`, {
      email: email,
      password: password,
      fullName: fullName,
      address: address,
      dob: dob,
      age: age,
      gender: gender,
      country: country,
      firstName: firstName,
      lastName: lastName,
      university,
      universityId: universityId,
      placeholder: contactNumber
    })
    .then(response => {
      const otp = generateOTP();
      // sendOTP(contactNumber, otp);
      submitOTP(otp);
      localStorage.setItem('username', email);
      localStorage.setItem('passed', "Not Passed");
      localStorage.setItem('otp', otp);
      Notiflix.Notify.success('Account created successfully!');
      navigate('/validation');
    })
    .catch(error => {
      Notiflix.Notify.failure(error.response.data.message||'Account creation failed');
    });
  };

  return (
    <div className="container container-long">
      <br></br>
      <h1 className="title">Create Account</h1>
      <p className="subtitle">Join with Us</p>
      <form className="form" onSubmit={submitAction}>
        <input
          type="email"
          placeholder="EMAIL"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="name-container">
          <input
            type="text"
            placeholder="FIRST NAME"
            className="input-field half-width"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="LAST NAME"
            className="input-field half-width"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* <input
          type="text"
          placeholder="FULL NAME"
          className="input-field"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /> */}
        <div className="name-container">
          <input
                type={dob ? "date" : "text"}
                placeholder="DATE OF BIRTH"
                className="input-field half-width"
                value={dob}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!dob) e.target.type = "text"; // Only revert to text if no date is selected
                }}
                onChange={(e) => {
                  setDob(e.target.value);
                  setAge(calculateAge(e.target.value));
                }}
            />
          <input
            type="text"
            placeholder="AGE"
            className="input-field half-width"
            value={age}
            readOnly
          />
        </div>
        <select
          className="input-field"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>SELECT GENDER</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {/* <input
          type="text"
          placeholder="ADDRESS"
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        /> */}
        
        <input
          type="text"
          placeholder="COUNTRY"
          className="input-field"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="UNIVERSITY"
          className="input-field"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="UNIVERSITY ID"
          className="input-field"
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
        /> */}
        {/* <input
          type="text"
          placeholder="CONTACT NUMBER"
          className="input-field"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        /> */}
        <div className="password-container">
          <input
            type="password"
            placeholder="PASSWORD"
            className="input-field half-width"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="RETYPE PASSWORD"
            className="input-field half-width"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="agreement"
            className="checkbox-input"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />
          <label htmlFor="agreement" className="checkbox-label">I accept the agreement</label>
        </div>
        <button type="submit" className="submit-button">Sign up</button>
      </form>
      <p className="login-prompt">Already have an account? <Link to={'/login'} className="signup-link">Access Here.</Link></p>
    </div>
  );
};

export default CreateAccount;
