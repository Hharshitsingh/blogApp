import { Grid } from "@mui/material"
import { Banner } from "../banner/banner"
import Categories  from "./categories"
import Posts from "./post/posts"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <div>
            <ToastContainer />
            <Banner />
            <Categories />
            <Grid container spacing={{ xs: 1, md: 4 }}>
                <Grid container item lg={12} sm={12} xs={12}>
                    <Posts />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;
