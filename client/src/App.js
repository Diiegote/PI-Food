import { Route, Switch } from 'react-router-dom';
import './App.css';
import Detail from './Component/Detail';
import Home from './Component/Home';
import LandingPage from './Component/Landing/LandingPage';
import RecipeCreate from './Component/RecipeCreate';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/recipes/:id" component={Detail}></Route>
        <Route path = "/createrecipes" component={RecipeCreate}/>
      </Switch>
    </div>
  );
}

export default App;
