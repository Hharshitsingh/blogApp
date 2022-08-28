import { Box, styled, Typography, FormControl, Grid } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg);
    width: 100%;
    height: 100vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
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

const About = () => {

    return (
        <Banner>
            <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                <Grid item sx={{ width: '90%', backgroundColor: '#d4c093fc' }}>
                    <Wrapper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl>
                                    <Typography variant="h4">Do you know what a blog is?</Typography>
                                    <Text variant="h5">
                                        If you don’t, then you’ve come to the right place. In 1994, when blogs began, a blog was more of a personal diary that people shared online. In this online journal, you could talk about your daily life or share about things that you were doing. Then, people saw an opportunity to communicate information in a new way online. Thus began the beautiful world of blogging.
                                    </Text>
                                    <Typography variant="h4">What is a Blog?</Typography>
                                    <Text variant="h5">
                                        A blog (a shortened version of “weblog”) is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.
                                    </Text>
                                    <Typography variant="h4">Why should I use a blog?</Typography>
                                    <Text variant="h5">
                                        A blog is a great way to share your thoughts and ideas with the world. It is a great way to express yourself and to share your thoughts and ideas with the world. A blog is a great way to share your thoughts and ideas with the world. It is a great way to express yourself and to share your thoughts and ideas with the world.
                                    </Text>

                                </FormControl>

                            </Grid>
                        </Grid>
                    </Wrapper>
                </Grid>
            </Grid>
        </Banner>
    )
}

export default About;