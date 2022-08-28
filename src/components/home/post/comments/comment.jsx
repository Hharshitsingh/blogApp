import { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { DataContext } from '../../../../context/dataProvider';
import { API } from '../../../../service/api';
import {timeStamp} from '../../../../utils/common-utils';
import { errorNotify, successNotify } from "../../../../utils/common-utils";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { acc } = useContext(DataContext);

    const removeComment = async () => {
        await API.deleteComment(comment._id).then(res => {
            setToggle(prev => !prev);
            successNotify(res.data.message);
        }).catch(err => {
            errorNotify(err.message);
        })
            
    }

    return (
        <>
            <Component>
                <Container>
                    <Name>{comment.fullname}</Name>
                    <StyledDate>{timeStamp(comment.date)}</StyledDate>
                    {(comment.username === acc.username || comment.postUsername === acc.username)  && <DeleteIcon onClick={() => removeComment()} style = {{color: 'red'}} />}
                </Container>
                <Typography>{comment.comment}</Typography>
            </Component>
        </>
    )

}

export default Comment;