import React,{useState} from 'react'


import MainPageLayouts from '../components/MainPageLayouts'

const Home = () => {

  const [input,setInput]=useState(' ');

  

  const onSearch=()=>{
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{
      console.log(result);
    })
  };
  const onInputChange=(ev)=>{
    setInput(ev.target.value);

  };
  const onKeyDown=(ev)=>{
    if (ev.KeyCode === 13){
  onSearch();
    }
    console.log(ev.keyCode)
  };

  return (
    <MainPageLayouts>
      <input type="text" onChange= {onInputChange}  onKeyDown={onKeyDown} value={input}/>
      <button type='button' onClick={onSearch}> Search</button>
    </MainPageLayouts>
  )
}

export default Home
