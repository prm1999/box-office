import React ,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';
//  {useEffect}
const Show = () => {

  const {id}=useParams();

  const [show,setShow]=useState(null)
  console.log(id);


  const [isLoading,setIsLoading]=useState(true);

  const [error,setError]=useState(null)

  useEffect(()=>{

    let isMounted=true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
    .then(results=>{

      setTimeout(()=>{

        if(isMounted){
          setShow(results);
        setIsLoading(false);
        } 
      },2000) //  for time out function


      // setShow(results);

    })
    .catch(err=>{
      if(isMounted){
        setError(err.message);
        setIsLoading(false);
      }
      

     } );

     return ()=>{
       isMounted=false;
     }

  },[id])

  console.log('show',show)


  if(isLoading){
    return<div>Date is loaded</div>
  }

  if (error){
    return <div> Error occured ;{error}</div>
  }
  return (
    <div>
  This is show pages
    </div>
  )
}

export default Show
