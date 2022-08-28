import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../service/api';
import { DataContext } from '../../../context/dataProvider';
import Comments from './comments/comments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify, timeStamp } from '../../../utils/common-utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: '20px auto'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Categor = styled(Typography)({
    color: '#878787',
    fontSize: '20px',
    margin: '0 10px',
    fontWeight: '600',
});


const DetailPost = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { acc } = useContext(DataContext);
    const [post, setPost] = useState({});
    const url = ('https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png');

    useEffect(() => {
        const fetchData = async () => {
            await API.getOnePost(id).then(res => {
                setPost(res.data.data);
            }).catch(err => {
                errorNotify(err.message);
            })
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        await API.deletePost(id).then(res => {
            navigate('/');
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    return (
        <Container>
            <ToastContainer />
            <Image src={post.image || url} alt="blog" />
            <Box style={{ float: 'right' }}>
                {
                    acc.username === post.username &&
                    <>
                        <Link to={`/updateBlog/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Link to={`/profile/${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.fullname || post.username} </span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{timeStamp(post.createDate)}  </Typography>
            </Author>
            <Categor>{post.category} </Categor>
            <ReactQuill value={post.content}
                readOnly
                theme="bubble"
                style={{ margin: '20px 0' }}
                toolBar={false}
            />
            <Comments post={post} />

        </Container>

    )
}

export default DetailPost;

