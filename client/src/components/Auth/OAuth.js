import React from 'react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase/Firebase';
import { loginFailure, loginStart, loginSuccess } from '../../store/user/userSlice.js';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const handleOnClick = async () => {
        console.log('Logging in with Google...');
        try {
            dispatch(loginStart());

            const data = await signInWithPopup(auth, provider);
            const user = data.user;
            console.log('user: ', user);

            const res = await axios.post('/auth/google', {
                username: user.displayName,
                email: user.email,
                profilePic: user.photoURL
            });

            dispatch(loginSuccess(res.data));
            navigate('/');
        } catch (error) {
            console.error('Error during authentication:', error.response || error);
            dispatch(loginFailure(error.message || 'Failed to login with Google'));
        }
    };

    return (
        <Button
            type='button'
            gradientDuoTone={'pinkToOrange'}
            outline
            onClick={handleOnClick}
        >
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    );
};

export default OAuth;
