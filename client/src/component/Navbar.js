import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import { user_Logout, user_Profile } from "../actions/Action";


const Navbar = () => {
    const history = useHistory()

    const dispatch = useDispatch()
    const authenticateUser = useSelector(state => state.authenticateUser)
    const loginStatus = useSelector(state => state.loginStatus)
  
    const cookie = Cookies.get("jwtLogin");

    const logout = () => {
      dispatch(user_Logout())
      history.push('/')
    }
    
    useEffect(() => {
      dispatch(user_Profile())
    }, [dispatch, cookie])

    return (
      <div className='nav_div'>
        <div className="firstname_nav">
          {authenticateUser && (<h3>{authenticateUser && (`Welcome ${authenticateUser.firstName}`)}</h3>)}
        </div>
            {
              loginStatus === false && cookie === undefined && (
              <>
                <NavLink to='/registerPage'><button>Sign Up</button></NavLink>        
                <NavLink to='/loginPage'><button>Sign In</button></NavLink>
                <NavLink to='/'><button>Home</button></NavLink>              
                <NavLink to='/vistiorArtist'><button>Artist</button></NavLink>
                <NavLink to='/visitorGenres'><button>Genres</button></NavLink> 
              </>
              )
            }
        
            {
              authenticateUser.role === "admin" && cookie !== undefined && loginStatus === true && (
                <>
                    <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
                    <NavLink to='/profile'><button>Profile</button></NavLink>              
                    <NavLink to='/changePassword'><button>Change Password</button></NavLink>
                    <NavLink to='/createGenres'><button>Create Genres</button></NavLink>
                    <NavLink to='/adminGenres'><button>Genres</button></NavLink>
                    <NavLink to='/adminArtist'><button>Artist</button></NavLink>
                    <button  onClick={logout}>Logout</button>
                </>
              )
            }
        
            {
              authenticateUser.role === "artist" && cookie !== undefined && loginStatus === true && (
              <>
                <NavLink to='/'><button>Home</button></NavLink>
                <NavLink to='/vistiorArtist'><button>Artist</button></NavLink>
                <NavLink to='/visitorGenres'><button>Genres</button></NavLink>
                <NavLink to='/createNFT'><button>CreateNFT</button></NavLink>
                <NavLink to='/artistProfile'><button>Profile</button></NavLink>
                <button  onClick={logout}>Logout</button>
              </>
              )
            }                                        
      </div>
    )
}

export default Navbar