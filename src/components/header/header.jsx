import { AppBar, styled, Toolbar, Button, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link} from "react-router-dom";
import { DataContext } from '../../context/dataProvider';
import { useContext, useState } from 'react';

const Container = styled(Box)`
    justify-content: center;
    & > a{
        color: #000000;
        text-decoration: none;
        font-size: 20px;
    }
`

const Container2 = styled(List)`
    justify-content: center;
    & > a{
        color: #000000;
        text-decoration: none;
        font-size: 20px;
    }
`
const drawerWidth = 240;


const Header = ({ isAuthenticated }) => {

    const { windows } = isAuthenticated;

    const { acc } = useContext(DataContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const fullname = acc.fullname ? acc.fullname : 'Blog App';

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link to={(isAuthenticated) ? `/profile/${acc.username}` : "/"} style = {{textDecoration: 'none', color: 'inherit'}}>
                    {fullname}
                </Link>
            </Typography>
            <Divider />

            <Container2>
                <Link to={"/"}>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={"/about"}>
                    <ListItem key="About" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={"/contact"}>
                    <ListItem key="contact" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {
                    (isAuthenticated) ? (
                        <Link to={"/logout"}>
                            <ListItem key="logout" disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ) : (
                        <Link to={"/login"}>
                            <ListItem key="login" disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} >
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    )
                }
            </Container2>
        </Box>
    );

    const container = windows !== undefined ? () => windows().document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" to="/" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Link to={(isAuthenticated) ? `/profile/${acc.username}` : "/"} style = {{textDecoration: 'none', color: 'inherit'}}>
                            {fullname}
                        </Link>
                    </Typography>
                    <Container sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link to={"/"}>
                            <Button key={"Home"} sx={{ color: '#fff' }} >
                                Home
                            </Button>
                        </Link>
                        <Link to={"/about"}>
                            <Button key={"About"} sx={{ color: '#fff' }} >
                                About
                            </Button>
                        </Link>
                        <Link to={"/contact"}>
                            <Button key={"Contact"} sx={{ color: '#fff' }} >
                                Contact
                            </Button>
                        </Link>



                        {
                            (isAuthenticated) ? (
                                <Link to={"/logout"}>
                                    <Button key={"Logout"} sx={{ color: '#fff' }} >
                                        Logout
                                    </Button>
                                </Link>
                            ) : (
                                <Link to={"/login"}>
                                    <Button key={"Login"} sx={{ color: '#fff' }} >
                                        Login
                                    </Button>
                                </Link>
                            )
                        }

                    </Container>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Header;
