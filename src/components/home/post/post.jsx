
import { styled, Box, Typography } from '@mui/material';
import {timeStamp} from '../../../utils/common-utils';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 300px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Post = ({ post }) => {

    const url = post.image ? post.image : 'https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png';
    return (
        <Container>
            <Image src={url} />
            <Heading>{post.title}</Heading>
            <Text>{post.category}</Text>
            <Text>{post.fullname || post.username}</Text>
            <Text>{timeStamp(post.createDate)}</Text>
        </Container>
    )
}

export default Post;