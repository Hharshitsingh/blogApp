import { styled, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { categories } from '../../constants/data';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f6bc16',
        color: theme.palette.text.primary,
    },
}));

const Categories = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: '10px' }}>
                    <Grid xs={2} sm={4} md={4} key="/create">
                        <StyledLink to={`/create`}>
                            <Item style={{ backgroundColor: "#f6bc16" }}>
                                Create Blog
                            </Item>
                        </StyledLink>
                    </Grid>
                    <Grid xs={2} sm={4} md={4} key="/">
                        <StyledLink to={"/"}>
                            <Item>
                                All Categories
                            </Item>
                        </StyledLink>
                    </Grid>
                    {categories.map(category => (
                        <Grid xs={2} sm={4} md={4} key={category.type}>
                            <StyledLink to={`?category=${category.type}`}>
                                <Item>
                                    {category.type}
                                </Item>
                            </StyledLink>
                        </Grid>
                    ))}
                </Grid>

            </Box>

        </>
    )
}

export default Categories;