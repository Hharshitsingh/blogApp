import { useState, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from "../../context/dataProvider";
import { TextField, Button, styled } from "@mui/material";
import { API } from "../../service/api";
import { errorNotify, successNotify } from "../../utils/common-utils";
import { useNavigate } from "react-router-dom";

const SignupButton = styled(Button)`
    margin: 10px 20px;
    background-color: #0e244;
    box-shadow: 5px 5px 10px  2px rgba(88, 88, 88, 0.5);
`;

const signupInValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = ({ setIsAuthenticated }) => {

    const [signupValue, setsignupValue] = useState(signupInValues);
    const { setAcc } = useContext(DataContext);
    const navigate = useNavigate();

    const onInput = (e) => {
        setsignupValue({
            ...signupValue,
            [e.target.name]: e.target.value
        });
    }

    const loginUser = async (loginValue) => {
        await API.userLogin(loginValue)
            .then(res => {
                setIsAuthenticated(true);
                sessionStorage.setItem('accesstoken', `Bearer ${res.data.accessToken}`);
                sessionStorage.setItem('refreshtoken', `Bearer ${res.data.refreshToken}`);
                setAcc({
                    fullname: res.data.fullname,
                    username: res.data.username
                });
                successNotify('Login Successfully');
                navigate('/');
            }).catch(err => {
                errorNotify(err.message);
            }
            );
    }

    const signupUser = async () => {
        if (signupValue.fullname === '') {
            errorNotify('Name is required');
            return;
        } else if (signupValue.username === '') {
            errorNotify('Username is required');
            return;
        } else if (signupValue.username.length < 6) {
            errorNotify('Username must be at least 6 characters');
            return;
        } else if (signupValue.username.length > 20) {
            errorNotify('Username must be less than 20 characters');
            return;
        } else if (signupValue.email === '') {
            errorNotify('Email is required');
            return;
        }else if (signupValue.password === '') {
            errorNotify('Password is required');
            return;
        } else if (signupValue.password.length < 6) {
            errorNotify('Password must be at least 6 characters');
            return;
        } else if (signupValue.password.length > 20) {
            errorNotify('Password must be less than 20 characters');
            return;
        } else if (!signupValue.password.match(/[A-Z]/)) {
            errorNotify('Password must contain at least one upper case character');
            return;
        } else if (!signupValue.password.match(/[a-z]/)) {
            errorNotify('Password must contain at least one lower case character');
            return;
        } else if (!signupValue.password.match(/[0-9]/)) {
            errorNotify('Password must contain at least one number');
            return;
        } else if (!signupValue.password.match(/[!@#$%^&*]/)) {
            errorNotify('Password must contain at least one special character');
            return;
        } else if (signupValue.confirmPassword === '') {
            errorNotify('Confirm Password is required');
            return;
        } else if (signupValue.password !== signupValue.confirmPassword) {
            errorNotify('Password and Confirm Password must be same');
            return;
        } else {
            await API.userSignup(signupValue).then(res => {
                setsignupValue(signupInValues);
                const loginValues  = {
                    username: signupValue.username,
                    password: signupValue.password
                }
                loginUser(loginValues);
            }).catch(err => {
                errorNotify(err.message);
            }
            );
        }
    }

    return (
        <>
            <ToastContainer />
            <TextField label="Name" variant="standard" value={signupValue.fullname} name="fullname" onChange={(e) => onInput(e)} />
            <TextField label="Username" variant="standard" value={signupValue.username} name="username" onChange={(e) => onInput(e)} />
            <TextField label="Email" variant="standard" value={signupValue.email} name="email" onChange={(e) => onInput(e)} />
            <TextField type="password" label="Password" variant="standard" value={signupValue.password} name="password" onChange={(e) => onInput(e)} />
            <TextField type="password" label="Confirm Password" variant="standard" value={signupValue.confirmPassword} name="confirmPassword" onChange={(e) => onInput(e)} />
            <SignupButton variant="contained" onClick={() => signupUser()}>SignUp</SignupButton>
        </>
    );
}


export default Signup;