import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth'
import { app } from '../firebase'
import { useCustomMutation } from '../hooks/useCustomMutation'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../store/slices/auth.slice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signInWithGoogleMutation = useCustomMutation({
        mutationFn: ({ data }) => axios.post('api/auth/google/', data),
        onSuccess: () => { dispatch(setCurrentUser({ currentUser: data.data })); navigate('/') }
    })
    const handleGoogleClick = async () => {
        // const provider = new GoogleAuthProvider()
        // const auth = getAuth(app)
        // const result = await signInWithPopup(auth, provider)
        // signInWithGoogleMutation.mutate({ data: { name: result.user.displayName, email: result.user.email, photo: result.user.photoURL } })
        // console.log(result)
    }
    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Continute With Google
        </button>
    )
}

export default OAuth