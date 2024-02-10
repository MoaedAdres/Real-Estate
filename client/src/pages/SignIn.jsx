import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from '../config/axios'
import { useCustomMutation } from '../hooks/useCustomMutation';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../store/slices/auth.slice';
import { useDispatch } from 'react-redux'
import OAuth from '../components/OAuth';
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().required("password is required")
  });
  const initialValues = {
    email: '',
    password: '',
  }
  const { mutate: signInUserMutation, isPending: isSigningIn, isError, error } = useCustomMutation({
    successFn: (data, newData) => {
      // localStorage.setItem('token', data.data?.token);
      dispatch(setCurrentUser({ currentUser: data.data }))
      navigate('/')
    },
    mutationFn: (user) => { return axios.post('api/auth/sign-in', user, { withCredentials: true }) }
  })
  const submitHandler = (values) => {
    signInUserMutation(values)
  }
  return (
    <div className='flex flex-col max-w-lg mx-auto gap-[10px]'>
      <div className='flex  flex-col gap-[10px]'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validateOnChange
          validationSchema={SigninSchema}
          onSubmit={submitHandler}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <Form className='w-full gap-[25px] flex flex-col' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-[5px]'>
                  <Field placeholder="email" className="border rounded-lg p-3" name="email" onChange={handleChange} value={values.email} />
                  <p className='text-red-600'><ErrorMessage name='email' /></p>
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <Field placeholder="password" className="border rounded-lg p-3" name="password" onChange={handleChange} value={values.password} />
                  <p className='text-red-600'><ErrorMessage name='password' /></p>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:bg-opacity-80' type='submit'>
                  {isSigningIn ? "Loading..." : "SignIn"}
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
      {isError && <p className='text-red-600'>{error.response?.data.message}</p>}
      <OAuth />
      <div className='flex gap-2 mt-1'>
        <p>don't Have an account?</p>
        <Link to="sign-in" >
          <span className='text-blue-700 '>Sign Up</span>
        </Link>
      </div>
    </div>

  )
}
export default SignIn