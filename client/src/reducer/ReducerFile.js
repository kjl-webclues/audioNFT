import { ADD_GENRES, CHANGE_PASSWORD, DELETE_GENERS, GET_ARTIST, GET_ARTIST_AND_GENRES_COUNT, GET_GENRES, GET_NFT, LOGIN_USER, LOGIN_USER_PROFILE, LOGOUT_USER, REGISTER_USER, UPDATE_GENRES, UPDATE_USER_PROFILE, UPLOAD_NFT, UPLOAD_NFT_AUDIO, UPLOAD_NFT_IMAGE, VALIDE_REGISTER } from "../actions/ActionType"

const initialState = {
    validRegister: false,
    loginStatus: false,
    Toggle: false,
    authenticateUser: '',
    totalPage: [],
    Artists: [],
    genres: [],
    CoverImage: [],
    AudioFile: [],
    getArtistCount: "",
    getGenresCount: "",

}

const ReducerFile = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER: {
            return {
                ...state,
                validRegister: true
            }
        }
            
        case VALIDE_REGISTER: {
            return {
                ...state,
                validRegister: false
            }
        }
            
        case LOGIN_USER: {
            return {
                ...state,
                loginStatus: true
            }            
        }
            
        case LOGIN_USER_PROFILE: {
            return {
                ...state,
                loginStatus: true,
                authenticateUser: action.payload.LoginUser
            }
        }
            
        case UPDATE_USER_PROFILE: {
            return {
                ...state
            }
        }
        
        case ADD_GENRES: {
            return {
                ...state,
                Toggle: true
            }
        }
        
        case GET_GENRES: {
            return {
                ...state,
                totalPage: action.payload.totalPage,
                genres: action.payload.genres,
                Toggle: false
            }
        }
        
        case DELETE_GENERS: {
            return {
                ...state,
                Toggle: true
            }
        }
        
        case UPDATE_GENRES: {
            return {
                ...state,
                Toggle:true
            }
        }
            
        case GET_ARTIST: {
            return {
                ...state,
                totalPage: action.payload.totalPage,
                Artists: action.payload.artist
            }
        }
            
        case UPLOAD_NFT: {
            return {
                ...state,
                CoverImage: [],
                AudioFile: [],
                Toggle : true
            }
        }
            
        case UPLOAD_NFT_IMAGE: {
            return {
                ...state,
                CoverImage: action.payload,
                Toggle : false
            }
        }
            
        case UPLOAD_NFT_AUDIO: {
            return {
                 ...state,
                AudioFile: action.payload,
                Toggle : false
            }
        }
        
        case GET_NFT: {
            return {
                ...state,
                AudioFile: action.payload,
                Toggle: false
            }
        }
            
        case CHANGE_PASSWORD: {
            return {
                ...state
            }
        }
            
        case GET_ARTIST_AND_GENRES_COUNT: {
            return {
                ...state,
                getArtistCount: action.payload.artistCount,
                getGenresCount: action.payload.genresCount
            }
        }
            
        case LOGOUT_USER: {
            return {
                ...state,
                loginStatus: false,
                authenticateUser: ""
            }
        }
            
        default:
            return state
    }
}

export default ReducerFile