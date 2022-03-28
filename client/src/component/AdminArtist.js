import React from 'react'
import { useState } from 'react';
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { get_Artist } from '../actions/Action';
import { Pagination } from '@material-ui/lab';

const Artist = () => {

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const dispatch = useDispatch()

  const Artists = useSelector(state => state.Artists)

  const totalPage = useSelector(state => state.totalPage)


  const handleSearch = debounce((value) => {
    setSearch(value)
  }, 500)

  useEffect(() => {
      dispatch(get_Artist(page, search))
  }, [page, search, dispatch])
  
  return (
    <>
      <h1>Artist List </h1>
        <div className='searchbar'>
          <input type="search" placeholder='Search Here...' onChange={(e) => handleSearch(e.target.value)} />        
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
                    <label>Email</label>
                      <p>{elem.email}</p>                    
                    <label>Genres</label>
                      {/* <td className='generesName'>{elem.genres}</td> */}

                    <div>
                      {
                        elem.genres.map((genres) => {
                          return (
                            <td className='generesName'>{ genres}</td>
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

export default Artist