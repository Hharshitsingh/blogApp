import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../../service/api";
import { Banner } from "../banner/banner";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import Posts from "../home/post/posts";
import { DataContext } from "../../context/dataProvider";
import EditProfile from "./editProfile";

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Profile = () => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { acc } = useContext(DataContext);
    const [changeProfile, setChangeProfile] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            await API.getProfile(username).then(res => {
                setUser(res.data);
            }).catch(err => {
                navigate('/');
            })
        }
        fetchProfile();
    }, [username, navigate]);


    return (

        <>
            <Banner >
            </Banner>
            {
                changeProfile ?
                    <>
                        <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                            <Grid item sx={{ maxWidth: '50rem', width: '100%', backgroundColor: '#ffffffba' }} >
                                <Wrapper>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={8} md={8}>
                                            <TextField disabled id="standard-disabled" value={user.fullname} variant="standard" fullWidth />
                                            <TextField disabled id="standard-disabled" value={user.username} variant="standard" fullWidth />
                                            <TextField disabled id="standard-disabled" value={user.email} variant="standard" fullWidth />
                                            {
                                                acc.username === user.username ?
                                                    <Button onClick={() => setChangeProfile(!changeProfile)}>
                                                        Change Password
                                                    </Button>
                                                    :
                                                    ''
                                            }
                                        </Grid>
                                    </Grid>
                                </Wrapper>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <>
                        <EditProfile user={user} setChangeProfile={setChangeProfile} setUser = {setUser} />
                    </>

            }
            <Grid container spacing={{ xs: 1, md: 4 }}>
                <Grid container item lg={12} sm={12} xs={12}>
                    <Posts usernam={username} />
                </Grid>
            </Grid>
        </>

    );
}

export default Profile;