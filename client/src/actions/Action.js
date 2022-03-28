import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ADD_GENRES, CHANGE_PASSWORD, DELETE_GENERS, GET_ARTIST, GET_ARTIST_AND_GENRES_COUNT, GET_GENRES, GET_NFT, LOGIN_USER, LOGIN_USER_PROFILE, LOGOUT_USER, REGISTER_USER, UPDATE_ARTIST_PROFILE, UPDATE_USER_PROFILE, UPLOAD_NFT, UPLOAD_NFT_AUDIO, UPLOAD_NFT_IMAGE, VALIDE_REGISTER } from './ActionType';
toast.configure()


export const register_User = (user, genres) => dispatch => {
    console.log("user", user);
    axios.post(`/signUp`,{ user, genres })
        .then((res) => {
            const result = res.data
            if (result === "Email already Exists") {
                toast.error(result, { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                } else {
                    toast.success(result, { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                    dispatch({type: REGISTER_USER, payload: res.data})
                }
        })
        .catch(err => {
            console.log(err);
        })
}

export const valid_Register = () => dispatch => {
    dispatch({type: VALIDE_REGISTER})
}

export const user_Login = (values) => dispatch => {
    axios.post(`/signIn`, values)
        .then(() => {
            toast.success("Login Successful!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });            
            dispatch({type: LOGIN_USER})
        })
        .catch(err => {
            toast.error("Invalid Credentials", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            console.log(err);
        })
}

export const user_Profile = (values) => dispatch => {
    axios.get(`/getUserProfile`, values)
        .then((res) => {
            dispatch({type: LOGIN_USER_PROFILE, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
}

export const update_User_Profile = (id, email, values) => dispatch => {    
        axios.put(`/updateUserProfile/${id}/${email}`, values)
            .then(res => {
                toast.success("Profile Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
                dispatch({ type: UPDATE_USER_PROFILE })
            })
            .catch(error => {
                toast.error("Profile Not Updated", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log("error", error);
            })
    
}

export const update_Artist_Profile = (id, checkGenres, values) => dispatch => {
    axios.put(`/updateArtistProfile/${id}`, {checkGenres, values})
        .then(res => {
            toast.success("Profile Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
            dispatch({type: UPDATE_ARTIST_PROFILE})
        })
        .catch(err => {
            toast.error("Profile Not Updated", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
            console.log("error", err);
        })
}

export const add_Genres = (genres) => dispatch => {
    axios.post(`/addGenres`, genres)
        .then((res) => {
            toast.success("Genres Add", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            dispatch({type: ADD_GENRES})
        })
        .catch(err => {
            toast.error("Genres Not  Add", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            console.log("error", err);
        })
}

export const get_Genres = (page, search) => dispatch => {
    axios.get(`/getGenres/?page=${page}&search=${search}`)
        .then((res) => {
            dispatch({type: GET_GENRES, payload: res.data})    
        })
        .catch(err => {
            console.log("Error", err);
        })
}

export const update_Genres = (id, values) => dispatch => {
    axios.put(`/updateGenres/?id=${id}`, values)
        .then((res) => {
            toast.success("Genres Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
            dispatch({type: UPDATE_USER_PROFILE, payload: res.data})
        })
        .catch(err => {
            toast.error("Genres Not Updated!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                                    
            console.log("error", err);
        })
}

export const delete_Gnres = (id) => dispatch => {
    axios.delete(`/deleteGenres/?id=${id}`)
        .then((res) => {
            dispatch({type: DELETE_GENERS})
        })
        .catch(err => {
            console.log("Error", err);
        })
}

export const get_Artist = (page, search) => dispatch => {
    axios.get(`/getArtist/?page=${page}&search=${search}`)
        .then((res) => {
            dispatch({type: GET_ARTIST, payload: res.data})
        })
        .catch(error => {
            console.log(error);
        })
}

export const upload_NFT = (userId, values, AudioFile, CoverImage) => dispatch => {
    axios.post(`/uploadNFT/?Id=${userId}`, {values, AudioFile, CoverImage})
        .then((res) => {                
                toast.success(res.data.msg, { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                            
                dispatch({ type: UPLOAD_NFT, payload: res.data })
            })
        .catch(error => {
                toast.error("Nft Title Already Exist!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log('error', error);
            })
}

export const add_NftImage = (CoverImage) => dispatch => {
    axios.post(`/addNFTImage`, CoverImage)
        .then(res => {
            // console.log("banner", res.data);
            dispatch({ type: UPLOAD_NFT_IMAGE, payload: res.data})            
            })
        .catch(error => {
            console.log("error", error);            
            })
}
export const upload_AudioFile = (values) => dispatch => {
        axios.post(`/uploadAudioFile`, values)
            .then((res) => {
                dispatch({ type: UPLOAD_NFT_AUDIO, payload: res.data })
            })
            .catch(err => {
                toast.error("File Is Not An Audio file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log(err);
            })    
}

export const get_NFT = () => dispatch => {
    axios.get(`/getNFT`)
        .then((res) => {
                dispatch({ type: GET_NFT, payload: res.data })
            })
            .catch(err => {
                console.log(err);
            })
}

export const change_Password = (id, values) => dispatch => {
    console.log("values", values);
    axios.put(`/changePassword/${id}`, values)
        .then((res) => {
            console.log("res.data", res.data);
            toast.success("password chenged", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });            
            dispatch({type: CHANGE_PASSWORD, payload: res.data})
        })
        .catch(err => {
            toast.error("Old Password Does not match", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
            console.log("error", err);
        })
}


export const get_Artist_Genres_Count = () => dispatch => {
    axios.get(`/getArtistAndGenresCount`)
        .then((res) => {
            dispatch({type: GET_ARTIST_AND_GENRES_COUNT, payload: res.data})
        })
        .catch(err => {
            console.log("error", err);
        })
}

export const user_Logout = () => dispatch => {
    axios.get(`/logout`)
        .then(() => {
            toast.success("User Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });            
            dispatch({type: LOGOUT_USER})
        })
        .catch(error => {
            toast.error("User Can Not Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
            console.log("error", error);
        })
}


