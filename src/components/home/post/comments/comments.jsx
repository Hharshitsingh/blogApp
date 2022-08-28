import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Avatar } from "@mui/material";
import { DataContext } from '../../../../context/dataProvider';
import { API } from '../../../../service/api';
import Comment from './comment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify, successNotify } from '../../../../utils/common-utils';

const Container = styled(Box)`
    margin-top: 100px;
`;

const Container2 = styled(Box)` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialCmt = {
    fullname: '',
    username: '',
    postId: '',
    postUsername: '',
    date: new Date(),
    comment: ''
}

const Comments = ({ post }) => {

    const { acc } = useContext(DataContext);

    initialCmt.postId = post._id;
    initialCmt.username = acc.username;
    initialCmt.fullname = acc.fullname;
    initialCmt.postUsername = post.username;

    const [comment, setComment] = useState(initialCmt);
    const [getComments, setGetComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getComments = async () => {
            await API.getAllComments(`${post._id}`).then(res => {
                setGetComments(res.data.data);
            }).catch(err => {
                errorNotify(err.message);
            })
        }
        getComments();
    }, [toggle, post]);


    const handleChang = (e) => {
        setComment({
            ...comment,
            comment: e.target.value
        })
    }

    const addComnt = async () => {
        if (comment.comment.length === 0) {
            errorNotify('Enter Comment to post');
            return;
        }
        await API.addComment(comment).then(res => {
            setComment(initialCmt);
            successNotify('Comment Added');
        }).catch(err => {
            errorNotify(err.message);
        })
        setToggle(prevState => !prevState);
    }

    return (
        <Box>
            <Container>
                <ToastContainer />
                <Container2>
                    <Avatar src = "/broken-image.jpg" />
                    <StyledTextArea placeholder="Write a comment" minRows={5} value={comment.comment} onChange={(e) => handleChang(e)} />
                    <Button variant="contained" color="secondary" style={{ height: '40px' }} onClick={() => addComnt()}>Post</Button>
                </Container2>
            </Container>

            <Box>
                {
                    getComments && getComments.length > 0 && getComments.map(getComment => (
                        <Comment comment={getComment} setToggle={setToggle} />
                    ))
                }
            </Box>

        </Box>
    )
}

export default Comments;