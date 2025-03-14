import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import env from '../configs/env';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      Notiflix.Notify.failure('Passwords do not match');
      return;
    }

    if (newPassword.trim() === '') {
      Notiflix.Notify.failure('Password cannot be empty');
      return;
    }

    if (!validatePassword(newPassword)) {
        Notiflix.Notify.failure('Password must be at least 8 characters and include uppercase, lowercase, digit, and special character');
        return;
    }

    try {
      const response = await fetch(env.SERVER_URL + '/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (response.ok) {
        Notiflix.Notify.success('Password reset successful');
        navigate('/login');
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Reset Password</h1>
      <form className="form" onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="submit-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
