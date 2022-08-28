import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Box, Button, FormControl, InputBase, Menu, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/dataProvider";
import { API } from "../../service/api";
import { categories } from "../../constants/data";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify } from "../../utils/common-utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const Container = styled(Box)({
    margin: '50px 100px',
});

const StyledFormControl = styled(FormControl)({
    margin: '20px 20px',
    display: 'flex',
    flexDirection: 'row',
});

const StyleInputBase = styled(InputBase)({
    flex: 1,
    margin: '0 10px',
    fontSize: '24px',
});

const initialPost = {
    title: '',
    content: '',
    image: '',
    username: '',
    fullname: '',
    category: '',
    createDate: new Date(),
};

const CreatePost = () => {

    const [value, setValue] = useState('');
    const [post, setPost] = useState(initialPost);
    const navigate = useNavigate();
    const { acc } = useContext(DataContext);
    const [category, setCategory] = useState('Select Category');

    const url = post.image ? post.image : 'https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png';
    const [file, setFile] = useState(url);
    const byteSize = str => new Blob([str]).size;

    useEffect(() => {
        const getImage = async () => {
            if (file !== url && file !== '' && file !== null && file !== undefined) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
                    errorNotify('Image must be jpeg, png, jpg');
                    return;
                }
                if (file.size > 2000000) {
                    errorNotify('Image must be less than 1mb');
                    return;
                }
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);
                await API.uploadFile(data).then(res => {
                    setPost({ ...post, image: res.data.imageurl });
                    setFile(res.data.imageurl);
                }).catch(err => {
                    errorNotify(err.message)
                })
            }
        }
        getImage();
    }, [file, post, url]);

    post.username = acc.username;
    post.fullname = acc.fullname;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    }

    const savePost = async () => {
        post.content = value;
        console.log(post);
        if (byteSize(post.content) > 2145728) {
            errorNotify('Content must be less than 2mb');
            return;
        }
        if (post.title.length < 5) {
            errorNotify('Title must be at least 5 characters');
            return;
        }
        if (post.content.length < 10) {
            errorNotify('Content must be at least 10 characters');
            return;
        }
        if (post.category === '') {
            errorNotify('Category must be selected');
            return;
        }
        await API.createPost(post).then(res => {
            navigate('/blogApp');
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    const [achorEl, setAchorEl] = useState(null);

    const handleClose = () => {
        setAchorEl(null);
    }

    const handleClick = (event) => {
        setAchorEl(event.currentTarget);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }


    return (
        <Container>
            <ToastContainer />
            <Image src={url} alt="" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddIcon fontSize="large" color='blue' />
                    <input type="file" id="fileInput" style={{ display: `none` }} onChange={(e) => setFile(e.target.files[0])} />
                </label>

                <StyleInputBase placeholder="Title" onChange={(e) => handleChange(e)} name="title" />

                <Button variant="outlined" color="secondary" onClick={handleClick} style={{ float: 'right' }}>
                    {category}
                </Button >

                <Menu id="simple-menu" anchorEl={achorEl} keepMounted open={Boolean(achorEl)} onClose={handleClose}>
                    {categories.map(category => {
                        return (
                            <MenuItem onClick={() => {
                                setCategory(category.type);
                                post.category = category.type;
                                handleClose();
                            }
                            }>{category.type}</MenuItem>
                        )
                    }
                    )}
                </Menu>

            </StyledFormControl>

            <ReactQuill
                theme="snow"
                name="content"
                modules={modules}
                history={
                    {
                        delay: 1000,
                        maxStack: 500,
                        userOnly: true
                    }
                }
                value={value} onChange={setValue}
            />

            <Button variant="contained" color="primary" onClick={() => savePost()}>Publish </Button>


        </Container>
    );
}

export default CreatePost;
