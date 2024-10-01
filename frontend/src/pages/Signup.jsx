import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../redux/userSlice';
import { CircularProgress } from '@mui/material';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name cannot exceed 40 characters"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string()
    .min(8, "Password is too short")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[\W_]/, "Password must contain a special character"),
});

function Signup() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await dispatch(Register(data));
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-800">
      <div className="p-8 w-full max-w-md shadow-lg bg-gray-200 rounded-md">
        <h1 className="text-black font-bold text-3xl text-center mb-4">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name Field */}
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              className={`pl-10 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none  transition duration-300`}
              type="text"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              className={`pl-10 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none 0 transition duration-300`}
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              className={`pl-10 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none  transition duration-300`}
              type="text"
              placeholder="Phone"
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              className={`pl-10 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none  transition duration-300`}
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Signup Button */}
          <button
            className="bg-black px-8 py-2 rounded-md w-full mt-3 text-white hover:bg-gray-800 transition duration-300"
            type="submit"
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Signup"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
