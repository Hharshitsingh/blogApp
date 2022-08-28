import { Box, styled, Typography, Link, FormControl, Button, TextField, Grid } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import { useState } from 'react';
import { API } from '../../service/api';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify, successNotify } from '../../utils/common-utils';

const Banner = styled(Box)`
    background-image: url(/images/contact-bg.png);
    // width: 100%;
    height: 100vh;
    background-position: center;
    filter: blur(0.5);
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const contctIntial = {
    name: '',
    email: '',
    message: '',
    timestamp: Date.now()
}

const Contact = () => {

    const [contact, setContact] = useState(contctIntial);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        if (contact.name === '' || contact.email === '' || contact.message === '') {
            errorNotify('All fields are required');
        } else {
            await API.conctactUs(contact).then(res => {
                successNotify('Message sent successfully');
                setContact(contctIntial);
            }).catch(err => {
                errorNotify(err.message);
            })

        }
    }




    return (

        <>
            <ToastContainer />
            <Banner>
                <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                    <Grid item sx={{ maxWidth: '50rem', width: '100%', backgroundColor: '#ffffffba' }}>
                        <Wrapper>
                            <Typography variant="h4">Getting in touch is easy!</Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12}>

                                    <FormControl>

                                        <Text variant="h5">
                                            If you have any questions or want to get in touch, please fill out the form below and I will get back to you as soon as possible.
                                        </Text>

                                        <TextField label="Enter Name" variant="standard" name="name" value={contact.name} onChange={(e) => handleChange(e)} />
                                        <TextField label="Enter Email" variant="standard" value={contact.email} onChange={(e) => handleChange(e)} name="email" />
                                        <TextField id="filled-textarea" label="Enter Message" value={contact.message} placeholder="Enter Message" multiline variant="standard" name='message' onChange={(e) => handleChange(e)} />
                                        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
                                        <ToastContainer />
                                    </FormControl>

                                </Grid>
                            </Grid>


                            <Text variant="h4">
                                <Link href="https://www.github.com/hharshitsingh/" color="inherit" target="_blank">
                                    <GitHub />
                                </Link>
                                <Link href="https://www.instagram.com/h8harshitsingh/" color="inherit" target="_blank">
                                    <Instagram />
                                </Link>
                                <Link href="mailto:h8harshitsingh@gmail.com?Subject=Query About Your Blog Website" target="_blank" color="inherit">
                                    <Email />
                                </Link>
                            </Text>
                        </Wrapper>
                    </Grid>
                </Grid>
            </Banner>
        </>

    );
}

export default Contact;