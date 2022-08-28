import { useState} from 'react';
import { DataProvider } from './context/dataProvider';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Acccout from './components/admin/accout';
import Home from './components/home/home';
import Header from './components/header/header';
import CreatePost from './components/create/CreatePost';
import DetailPost from './components/home/post/detailpost';
import UpdatePost from './components/create/updatePost';
import About from './components/about/about';
import Contact from './components/contact/contact';
import LogoutUser from './components/admin/logout';
import Profile from './components/admin/profile';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Outlet />
    </> : (
      <Navigate replace to="/blogApp/login" />
    )
}

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/blogApp" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp" element={<Home />} />
          </Route>

          <Route path="/blogApp/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/create" element={<CreatePost />} />
          </Route>
          <Route path="/blogApp/post/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/post/:id" element={<DetailPost />} />
          </Route>
          <Route path="/blogApp/updateBlog/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/updateBlog/:id" element={<UpdatePost />} />
          </Route>
          <Route path="/blogApp/about" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/about" element={<About />} />
          </Route>
          <Route path="/blogApp/contact" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/contact" element={<Contact />} />
          </Route>

          <Route path="/blogApp/profile/:username" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/profile/:username" element={<Profile />} />
          </Route>

          <Route path="/blogApp/login" element={<Acccout setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/blogApp/logout" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/blogApp/logout" element={<LogoutUser setIsAuthenticated={setIsAuthenticated} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
