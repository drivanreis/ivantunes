import { Route, Routes } from 'react-router-dom';
import Album from './pages/album';
import Layout from './pages/index';
import Login from './pages/login';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/" element={ <Login /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
