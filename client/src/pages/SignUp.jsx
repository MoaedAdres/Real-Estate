import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from '../config/axios'
import { useCustomMutation } from '../hooks/useCustomMutation';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'minimum is 5')
      .max(40, 'max is 40')
      .required('Required'),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().required("password is required")
  });
  const initialValues = {
    username: '',
    email: '',
    password: '',
  }
  const { mutate: createUserMutation, isLoading: isCreatingUser, isError, error } = useCustomMutation({
    successFn: () => { navigate('/sign-in') },
    mutationFn: (user) => { return axios.post('api/auth/sign-up', user) }
  })
  const submitHandler = (values) => {
    console.log(values)
    createUserMutation(values)
  }
  return (
    <div className='flex flex-col max-w-lg mx-auto'>
      <div className='flex  flex-col gap-[10px]'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validateOnChange
          validationSchema={SignupSchema}
          onSubmit={submitHandler}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <Form className='w-full gap-[25px] flex flex-col' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-[5px]'>
                  <Field placeholder="username" className="border rounded-lg p-3" name="username" onChange={handleChange} value={values.username} />
                  {errors.username && touched.username && <ErrorMessage name='username' />}
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <Field placeholder="email" className="border rounded-lg p-3" name="email" onChange={handleChange} value={values.email} />
                  {errors.email && touched.email && <ErrorMessage name='email' />}
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <Field placeholder="password" className="border rounded-lg p-3" name="password" onChange={handleChange} value={values.password} />
                  {errors.password && touched.password && <ErrorMessage name='password' />}
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:bg-opacity-80' type='submit'>
                  SignUp
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
      <div className='flex gap-2 mt-1'>
        <p>Have an account</p>
        <Link to="sign-in" >
          <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
    </div>

  )
}
export default SignUp