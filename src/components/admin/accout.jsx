import { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import Login from "./login";
import Signup from "./signup";


const ComponentStyles = styled(Box)`
background-image: url(https://cdn.pixabay.com/photo/2014/02/13/07/28/wordpress-265132_960_720.jpg);
height: 100vh;
background-position: left 0px bottom 0px;
background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
` ;

const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const LoginButton = styled(Button)`
    margin: 10px 20px;
    background-color: #0e244;
    box-shadow: 5px 5px 10px  2px rgba(88, 88, 88, 0.5);
`;

const Acccout = ({ setIsAuthenticated }) => {


    const [account, setAccount] = useState('login');

    const handleAccountChange = () => {
        account === 'login' ? setAccount('signup') : setAccount('login');
    }

    return (
        <ComponentStyles>
            <Box>

                <Wrapper>
                    {
                        account === 'login' ?
                            <>
                                <Login setIsAuthenticated={setIsAuthenticated} />
                                <LoginButton variant="outlined" onClick={() => handleAccountChange()}>Create an Account</LoginButton>
                            </>
                            :
                            <>
                                <Signup setIsAuthenticated={setIsAuthenticated} />
                                <LoginButton variant="outlined" onClick={() => handleAccountChange()}>Already Have an Account</LoginButton>
                            </>
                    }
                </Wrapper>
            </Box>
        </ComponentStyles>
    );
}

export default Acccout;