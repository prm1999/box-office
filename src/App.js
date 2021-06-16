import React from 'react';
import { Switch,Route} from 'react-router-dom';
import Home from './pages/Home'
import Starred from './pages/Starred'


// import Navs from './components/Navs'

function App() {
  return (
    <div>
     
    <Switch >
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route exact path='/starred'>
          <Starred/>   
           </Route>


      <Route > <div> Not Found 404</div>   </Route>
    </Switch>
    </div>
  );
}

export default App;
