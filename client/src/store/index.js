import authSlice from './slices/auth.slice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    auth: authSlice
})
export default rootReducer