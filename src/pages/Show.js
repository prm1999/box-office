/* eslint no-underscore-dangle: 0 */

import React ,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import ShowMainData from '../components/show/ShowMainData';
import Details from '../components/show/Details';
import { apiGet } from '../misc/config';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';


//  {useEffect}


const reducer=(prevState,action)=>{

  switch (action.type){
    case 'FETCH_SUCCESS':
      {
        return {...prevState,isLoading:false,error:null,  show:action.show}
      }

    case 'FETCH_FAIL':{
      return {...prevState,isLoading:false,error:action.error}
    }

      default:return prevState
  }
}




const initialState={
  show:null,
  isLoading:true,
  error:null

}



const Show = () => {

  const {id}=useParams();


   const [{show,isLoading,error},dispatch]=useReducer(
     reducer,
     initialState )
//  
  // const [show,setShow]=useState(null)
  // console.log(id);


  // const [isLoading,setIsLoading]=useState(true);

  // const [error,setError]=useState(null)

  useEffect(()=>{

    let isMounted=true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
    .then(results=>{

      setTimeout(()=>{

        if(isMounted){

          dispatch({type:'FETCH_SUCCESS',show:results})
        //   setShow(results);
        // setIsLoading(false);
        } 
      },2000) //  for time out function


      // setShow(results);

    })
    .catch(err=>{
      if(isMounted){
        dispatch({type:'FETCH_FAIL',error:err.message})

        // setError(err.message);
        // setIsLoading(false);
      }
      

     } );

     return ()=>{
       isMounted=false;
     }

  },[id])
  console.log(show,isLoading, error)


  console.log('show',show)


  if(isLoading){
    return<div>Date is loaded</div>
  }

  if (error){
    return <div> Error occured ;{error}</div>
  }
  return (
    <div>
  <ShowMainData 
  image={show.image}
   name={show.name}
    rating={show.rating} 
    summary={show.summary}
    tags={show.genres}/>

    <div>
      <h2>Details</h2>
        <Details 
        status={show.status}
        network={show.network}
        premiered={show.premiered}
        
        />
    </div>

    <div>
      <h2>Seasons</h2>
      <Seasons seasons={show._embedded.seasons} /> 
    </div>

    <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>

  
    </div>
  )
}

export default Show
