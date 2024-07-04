"use client"

import { sendMail } from '@/actions/form';
import React, { useState, useEffect } from 'react';

const Verification = ({setIsVerified}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(120);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (otpSent && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [otpSent, timer]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    sendMail(email);
    setOtpSent(true);
    setTimer(120);

  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // Logic to verify OTP
    // const isValid = await verifyOtp(email, otp); // Implement this function
    const isValid = otp === '123456'; // Mock validation
    setVerified(isValid);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={!otpSent || timer <= 0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button 
              type="submit" 
              disabled={timer <= 0}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>
            <div className="text-sm text-gray-500 text-center">{`Time remaining: ${timer} seconds`}</div>
          </form>
        )}
        {verified && <div className="mt-4 text-green-600 font-medium text-center">Verification successful!</div>}
        {otpSent && timer <= 0 && <div className="mt-4 text-red-600 font-medium text-center">OTP expired. Please request a new OTP.</div>}
      </div>
    </div>
  );
};

export default Verification;