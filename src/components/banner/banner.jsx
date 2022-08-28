import { styled, Box} from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png) center/60% no-repeat #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Banner = () => {
    
    return (
        <Image>
        </Image>
    )
}
