import React, { useState ,useEffect} from 'react'
import MainPageLayouts from '../components/MainPageLayouts'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShow } from '../misc/custom-hooks';

const Starred = () => {

  const [starred]=useShow();
  const [shows,setShows]=useState(null)
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null)

  useEffect(()=>{
    if(starred && Starred.length>0){

      const promises=starred.map(showId=>apiGet(`/shows/${showId}`));

      Promise.all(promises)
      .then(apiData=>apiData.map(show=>({show})))
      .then(results=>{
        console.log('results',results);

        setShows(results);
        setIsLoading(false)
      }).catch(err=>{
        setError(err.message);
        setIsLoading(false);

      });
    }
    else{
      setIsLoading(false);
    }

  },[starred]);

  return (
    <MainPageLayouts>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayouts>
  )
}

export default Starred
