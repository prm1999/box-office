import React,{useState,useCallback} from 'react'
import { apiGet } from '../misc/config';

import MainPageLayouts from '../components/MainPageLayouts'
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid'
import { useLastQuery } from '../misc/custom-hooks';
import {SearchInput,RadioInputsWrapper,SearchButtonWrapper} from './Home.styled'
import CustomRadio, { useWhyDidYouUpdate } from '../components/CustomRadio';

const Home = () => {

  // for input
  const [input,setInput]=useLastQuery();  

  //  for results

  const [results,setResults]=useState(null);

  const [searchOption,setSearchOptions]=useState('shows')

  const isShowSearch=searchOption==='shows';//  by default value

// for use effect 
//   useEffect(()=>{
// console.log('use effect run')

// return ()=>{
//   console.log('exit')
// }

//   },[searchOption])




  const onSearch=()=>{
    apiGet(`/search/${searchOption}?q=${input}`)
    .then(result=>{
      setResults(result);
      console.log(result);
    })
  };
  const onInputChange=useCallback((ev)=>{
    setInput(ev.target.value);

  },[setInput]);

  const onKeyDown=ev=>{
    if (ev.keyCode === 13){
  onSearch();
    }
    console.log(ev.keyCode)
  };

const onRadioChange=useCallback((ev)=>{
  setSearchOptions(ev.target.value)


},[]);
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
      <SearchInput 
      placeholder="Search for Movie"
      type="text"
      
      onChange= {onInputChange}  
      onKeyDown={onKeyDown} 
      value={input}
      />

    <RadioInputsWrapper>
      <div>
    <CustomRadio
    label ="Shows"
    id="show-search" 
    type='radio'
    value='shows' 
    checked={isShowSearch}
    onChange={onRadioChange}
    />
    
    </div>
    <div>
    <CustomRadio
    label ="Actors"
    id="actor-search"
     value='people'
     checked={!isShowSearch}
     onChange={onRadioChange}

    />
    
     
    </div>
    </RadioInputsWrapper>

    <SearchButtonWrapper>
      <  button type='button' onClick={onSearch}>
         Search
        </ button>
        </SearchButtonWrapper>
        {renderResults()}
    </MainPageLayouts>
  )
}

export default Home
