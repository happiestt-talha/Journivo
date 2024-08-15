import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../store/userSlice'
export const login = async (user, dispatch) => {
    try {
        dispatch(loginStart)
        const res = await axios.post('/auth/signin', user)
        dispatch(loginSuccess(res.data))
        return res.data
    } catch (error) {
        dispatch(loginFailure())
        return error.response.data
    }
}