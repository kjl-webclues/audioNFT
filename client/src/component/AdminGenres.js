import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@material-ui/lab';
import debounce from 'lodash.debounce'
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { delete_Gnres, get_Genres, user_Profile } from '../actions/Action';

const AdminGenres = () => {

const [page, setPage] = useState(1)

const [search, setSearch] = useState('')

const dispatch = useDispatch() 

const genres = useSelector(state => state.genres)
const totalPage = useSelector(state => state.totalPage)
const Toggle = useSelector(state => state.Toggle)

    
console.log("genres", genres);
    

const handleSearch = debounce((value) => {
    setSearch(value)    
}, 500)
    
const handleDeleteGenres = (id) => {
    if (window.confirm("Are You sure")) {
        dispatch(delete_Gnres(id))
    }    
}

useEffect(() => {
    dispatch(get_Genres(page, search))
}, [page, search, Toggle, dispatch])
    
useEffect(() => {
      dispatch(user_Profile())
}, [])

    return (
      
      <>
      <h1>Genres List</h1>
       <div className='searchbar'>
        <input type="search" placeholder='Search Here...' onChange={(e) => handleSearch(e.target.value)} />        
      </div>
      <div>                  
                {
                  genres && genres.map((elem) => {
                    return (
                      <>
                        <div className="mainGenres">
                          <div className="midDiv">
                              <div key={elem._id}>                                                                                                            
                                <label>{elem.title}</label>   
                              <p>{elem.description}</p>   
                              <NavLink to={`editGenres/:?id=${elem._id}`}><button className='editbtn'>Edit</button></NavLink>
                                <button className='deletebtn' onClick={() => handleDeleteGenres(elem._id)}>Delete</button>
                            </div>                              
                          </div>
                        </div>                        
                      </>
                    )
                  })
                }                       
      </div><br/>
      <Pagination
        count={totalPage}                            
        shape='rounded'
        variant='outlined'                    
        onChange={(event, value) => { setPage(value) }}
      /> 
    </>
    
  )
}

export default AdminGenres