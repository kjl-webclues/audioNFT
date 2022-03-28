import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_Artist_Genres_Count } from '../actions/Action'


const Dashbord = () => {
  const dispatch = useDispatch()

  const getArtistCount = useSelector(state => state.getArtistCount)
  const getGenresCount = useSelector(state => state.getGenresCount)

  useEffect(() => {
    dispatch(get_Artist_Genres_Count())
  }, [])
  return (
    <>
      <div className='wrapper'>
                <h1>Artist</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">                              
                        <h3>Total Number of Artists</h3>
                        <p>{getArtistCount}</p>                                                      
                        </div>
                    </div>
      </div>
      
      <div className='wrapper'>
                <h1>Genres</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">                              
                          <h3>Total Number of Genres</h3>
                          <p>{getGenresCount}</p>                                                     
                        </div>
                    </div>
            </div>
      
    </>
  )
}

export default Dashbord