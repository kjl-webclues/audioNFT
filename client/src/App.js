import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './component/HomePage';
import RegisterForm from './component/RegisterForm';
import LoginForm from './component/LoginForm';
import Navbar from './component/Navbar';
import AdminProfile from './component/AdminProfile';
import AdminArtist from './component/AdminArtist';
import AdminGenres from './component/AdminGenres';
import CreateGenres from './component/CreateGenres';
import ArtistProfile from './component/ArtistProfile';
import ProtectedRoutes from './component/ProtectedRoutes';
import VisitorGenres from './component/VisitorGenres';
import VisitorArtist from './component/VisitorArtist';
import CreateNFT from './component/CreateNFT';
import ChangePassword from './component/ChangePassword';
import Dashbord from './component/Dashbord';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';



const App = () => {
  const authenticateUser = useSelector(state => state.authenticateUser)

  const loginStatus = useSelector(state => state.loginStatus)

  const cookie = Cookies.get("jwtLogin");

  return (
    <>
      <Navbar />
      <hr/>
      <Switch>
        <Route exact path='/' component={HomePage} />
                
        {
          authenticateUser.role === 'admin' && (
            <>
              <ProtectedRoutes exact path='/changePassword' component={ChangePassword} isAuth={cookie} />
              <ProtectedRoutes exact path='/dashboard' component={Dashbord} isAuth={cookie} />              
              <ProtectedRoutes exact path='/profile' component={AdminProfile} isAuth={cookie} />
              <ProtectedRoutes exact path='/adminArtist' component={AdminArtist} isAuth={cookie} />
              <ProtectedRoutes exact path='/createGenres' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/adminGenres' component={AdminGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/editGenres/:id' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />
            </>
          ) 
        }

        {
          authenticateUser.role === 'artist' && (
            <>
              <ProtectedRoutes exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />
              <ProtectedRoutes exact path='/visitorGenres' component={VisitorGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/vistiorArtist' component={VisitorArtist} isAuth={cookie} />
              <ProtectedRoutes exact path='/createNFT' component={CreateNFT} isAuth={cookie} />
            </>
          )
        }

        {
          cookie === undefined || loginStatus === false ? (
            <>
              <Route exact path='/' component={HomePage} />                            
              <ProtectedRoutes exact path='/profile' component={AdminProfile} isAuth={cookie} />
              <ProtectedRoutes exact path='/adminArtist' component={AdminArtist} isAuth={cookie} />
              <ProtectedRoutes exact path='/createGenres' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/adminGenres' component={AdminGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/editGenres/:id' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoutes exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />
              <ProtectedRoutes exact path='/createNFT' component={CreateNFT} isAuth={cookie} />
              <ProtectedRoutes exact path='/changePassword' component={ChangePassword} isAuth={cookie} />
              <ProtectedRoutes exact path='/dashboard' component={Dashbord} isAuth={cookie} />              

              <Route exact path='/registerPage' component={RegisterForm} />
              <Route exact path='/loginPage' component={LoginForm} />
              <Route exact path='/visitorGenres' component={VisitorGenres} />
              <Route exact path='/vistiorArtist' component={VisitorArtist} />


            </>
          ): <Redirect to='/' />
        }
        

      </Switch>
    </>    
  )
}

export default App