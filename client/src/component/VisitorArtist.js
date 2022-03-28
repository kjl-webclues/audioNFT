import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@material-ui/lab';
import debounce from 'lodash.debounce'
import { get_Artist } from '../actions/Action';

const VisitorArtist = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");

  const dispatch = useDispatch()

  const Artists = useSelector(state => state.Artists)
  const totalPage = useSelector(state => state.totalPage)

  const handleSearch = debounce((e) => {
    setSearch(e.target.value)
  }, 500)
  
  useEffect(() => {
    dispatch(get_Artist(page, search))
  }, [page, search, dispatch])
    
  return (
    <>
      <h1>Artist List </h1>
      <div className='searchbar'>
        <input type="search" placeholder='Search Here...' onChange={(e) => handleSearch(e)} />        
      </div>
      {
        Artists && Artists.map((elem) => {
          return (
                        
            <div className='wrraper'>
              <div className="mainGenres">
                <div className="midDiv">
                  <div key={elem._id}>
                    <label>userName</label>  
                      <p>{elem.userName}</p><br />  
                    <label>Bio</label>
                      <p>{elem.bio}</p>                    
                    <label>Genres</label>                    
                    <div>
                      {
                        elem.genres.map((genres) => {
                          return (
                            <td className="generesName">{ genres}</td>
                          )
                        })
                      }
                    </div>
                        
                  </div>
                </div>
              </div>
            </div> 
          )
        })
      }
      <Pagination
        count={totalPage}                            
        shape='rounded'
        variant='outlined'                    
        onChange={(event, value) => { setPage(value) }}
      /> 
    </>  
  )
}

export default VisitorArtist