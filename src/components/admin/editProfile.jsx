import { Box, styled, Typography, FormControl, Button, TextField, Grid } from '@mui/material';
import { useState} from 'react';
import { API } from '../../service/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify, successNotify } from '../../utils/common-utils';

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const EditProfile = ({ user, setChangeProfile }) => {

    const editIntialValues = {
        password: '',
        confirmPassword: ''
    }

    const [editProfile, setEditProfile] = useState(editIntialValues);

    const handleChange = (e) => {

        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        const username = user.username;
        const { password, confirmPassword } = editProfile;

        if (password === '') {
            errorNotify('No changes made');
            setChangeProfile(true);
        } else if (password.length > 0) {
            if (password.length < 6) {
                errorNotify('Password must be at least 6 characters');
            } else if (password.length > 20) {
                errorNotify('Password must be less than 20 characters');
            } else if (!password.match(/[A-Z]/)) {
                errorNotify('Password must contain at least one upper case character');
            } else if (!password.match(/[a-z]/)) {
                errorNotify('Password must contain at least one lower case character');
            } else if (!password.match(/[0-9]/)) {
                errorNotify('Password must contain at least one number');
            } else if (!password.match(/[!@#$%^&*]/)) {
                errorNotify('Password must contain at least one special character');
            } else if (password !== confirmPassword) {
                errorNotify('Password and Confirm Password do not match');
            } else {
                await API.editProfile({
                    username: username,
                    password: password
                }).then(res => {
                    successNotify('Profile updated successfully');
                    setChangeProfile(true);
                }).catch(err => {
                    errorNotify(err.message);
                })
            }
        } else {
            setChangeProfile(true);
        }
    }

    return (

        <>
            <ToastContainer />
            <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                <Grid item sx={{ maxWidth: '50rem', width: '100%', backgroundColor: '#ffffffba' }}>
                    <Wrapper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl>
                                    <Typography variant="h4">Change Password </Typography>

                                    <TextField label="Enter Password" type="password" variant="standard" name="password" value={editProfile.password} onChange={(e) => handleChange(e)} />
                                    <TextField label="Enter Confirm Password" type="password" variant="standard" name="confirmPassword" value={editProfile.confirmPassword} onChange={(e) => handleChange(e)} />

                                    <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
                                    <ToastContainer />
                                </FormControl>

                            </Grid>
                        </Grid>
                    </Wrapper>
                </Grid>
            </Grid>
        </>

    );
}

export default EditProfile;