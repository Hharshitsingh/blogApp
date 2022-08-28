import { useEffect } from "react";
import { useState } from "react";
import { API } from "../../../service/api";
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import Post from './post';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify } from "../../../utils/common-utils";

const Posts = ({ usernam }) => {
    const [posts, setPost] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            await API.getAllPosts({ category: category || '', usernam: usernam }).then(res => {
                setPost(res.data.data);
            }).catch(err => {
                errorNotify(err.message);
            }
            );
}
fetchData();
    }, [category, usernam]);


return (
    <>
        <ToastContainer />
        {
            posts && posts.length > 0 ? posts.map((post) => {
                return (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/post/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )

            }) : <Box style={{ color: '878787', margin: '30px 100px', fontSize: 24 }}>
                No data is available for selected category
            </Box>
        }
    </>
);
}
export default Posts;