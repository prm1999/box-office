import React,{useState} from 'react'
import { apiGet } from '../misc/config';

import MainPageLayouts from '../components/MainPageLayouts'

const Home = () => {

  const [input,setInput]=useState(' ');

  const [results,setResults]=useState(null);

  const onSearch=()=>{
    apiGet(`/search/shows?q=${input}`)
    .then(result=>{
      setResults(result);
      console.log(result);
    })
  };
  const onInputChange=(ev)=>{
    setInput(ev.target.value);

  };
  const onKeyDown=ev=>{
    if (ev.keyCode === 13){
  onSearch();
    }
    console.log(ev.keyCode)
  };

  const renderResults=()=>{
    if(results && results.length===0){
      return <div> No Results</div>
    }
    if(results && results.length>0){
      return <div> 
      {results.map(item=>(
      <div key={item.show.id}>{ item.show.name}</div>))}
      
      </div>
    }
    return null;
  }

  return (
    <MainPageLayouts>
      <input type="text" onChange= {onInputChange}  
      onKeyDown={onKeyDown} 
      value={input}
      />

      <button type='button' onClick={onSearch}>
         Search
        </button>
        {renderResults()}
    </MainPageLayouts>
  )
}

export default Home
