import React,{useState} from 'react'
import { apiGet } from '../misc/config';

import MainPageLayouts from '../components/MainPageLayouts'
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid'


const Home = () => {

  const [input,setInput]=useState(' ');

  const [results,setResults]=useState(null);

  const [searchOption,setSearchOptions]=useState('shows')

  const isShowSearch=searchOption==='shows';




  const onSearch=()=>{
    apiGet(`/search/${searchOption}?q=${input}`)
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


const onRadioChange=(ev)=>{
  setSearchOptions(ev.target.value)


};
console.log(searchOption);



  const renderResults=()=>{
    if(results && results.length===0){
      return <div> No Results</div>
    }
    if(results && results.length>0){
      return results[0].show? (<ShowGrid data ={results}/>)
      // results.map(item=>(
      // <div key={item.show.id}>{ item.show.name}</div>))
      :(<ActorGrid data={results}/>)
      // results.map(item=>(
      //   <div key={item.person.id}>{ item.person.name}</div>))
      
      
    
  }
  return null;
};

  return (
    <MainPageLayouts>
      <input 
      placeholder="Search for Movie"
      type="text"
      
      onChange= {onInputChange}  
      onKeyDown={onKeyDown} 
      value={input}
      />
    <div>
    <label htmlFor="show-search">
      shows
      <input id="show-search" 
      type='radio'
       value='shows' 
       checked={isShowSearch}
       onChange={onRadioChange}/>
    </label>

    <label htmlFor="actor-search">
      Actor
      <input  id="actor-search"
       type='radio'
        value='people'
        checked={!isShowSearch}
        onChange={onRadioChange}/>
    </label>




    </div>
      <button type='button' onClick={onSearch}>
         Search
        </button>
        {renderResults()}
    </MainPageLayouts>
  )
}

export default Home
