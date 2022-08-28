import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, styled } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/dataProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify, successNotify } from "../../utils/common-utils";

const LoginButton = styled(Button)`
    margin: 10px 20px;
    background-color: #0e244;
    box-shadow: 5px 5px 10px  2px rgba(88, 88, 88, 0.5);
`;

const loginInValues = {
    username: '',
    password: ''
}

const Login = ({ setIsAuthenticated }) => {

    const [loginValue, setloginValue] = useState(loginInValues);
    const { setAcc } = useContext(DataContext);
    const navigate = useNavigate();

    const onInputLogin = (e) => {
        setloginValue({
            ...loginValue,
            [e.target.name]: e.target.value
        });
    }

    const loginUser = async () => {

        if (loginValue.username === '') {
            errorNotify('Username is required');
            return;
        } else if (loginValue.password === '') {
            errorNotify('Password is required');
            return;
        } else {
            await API.userLogin(loginValue)
                .then(res => {
                    setIsAuthenticated(true);
                    setloginValue(loginInValues);
                    sessionStorage.setItem('accesstoken', `Bearer ${res.data.accessToken}`);
                    sessionStorage.setItem('refreshtoken', `Bearer ${res.data.refreshToken}`);
                    setAcc({
                        fullname: res.data.fullname,
                        username: res.data.username,
                        email: res.data.email
                    });
                    successNotify('Login Successfully');
                    navigate('/blogApp');
                }).catch(err => {
                    errorNotify(err.message);
                }
                );
        }
    }

    return (
        <>
            <ToastContainer />
            <TextField label="Username" variant="standard" value={loginValue.username} name="username" onChange={(e) => onInputLogin(e)} />
            <TextField type="password" label="Password" variant="standard" value={loginValue.password} name="password" onChange={(e) => onInputLogin(e)} />
            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
        </>
    );
}

export default Login;