import { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import {LoginContext} from './contexts/login';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <LoginContext.Provider value={[isLogin, setIsLogin]}>
        <div>
          <Switch>
            <Route exact path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {
                isLogin ? <Home /> : <Redirect to="/sign-in" />
              }
            </Route>
          </Switch>
        </div> 
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
