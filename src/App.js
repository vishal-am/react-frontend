import React from 'react';
import './App.css';
import Register from './components/layout/Register'
import Login from './components/layout/Login'
import Home from './components/Home';
import Joi from './components/layout/joi'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Home from './components/Home';
// import '..../node_modules/bootstrap/dist/css/bootstrap.css'

// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";

function App() {
  return (
    <div className="App" style={{
      backgroundColor:'#e0ece4'
    }}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/">
          <Home/>
          </Route>
         
        </Switch>
      </div>
    </Router>

      
    </div>
  );
}

export default App;
