import React ,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';
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


   const [state,dispatch]=useReducer(reducer,initialState )
//  {show,isLoading,error}
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
  console.log('state',state)


  // console.log('show',show)


  // if(isLoading){
  //   return<div>Date is loaded</div>
  // }

  // if (error){
  //   return <div> Error occured ;{error}</div>
  // }
  return (
    <div>
  This is show pages
    </div>
  )
}

export default Show
