import React, { Component } from 'react';
import '../css/App.css';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom'
import CoordWeather from './CoordWeather'
// ☁React.js, React-Router app that consults both Open Weather and Google Maps' APIs, and gives you today's forecast based on your location. You can also input other cities by typing their names in.

//TODO:
//
//      - Finish my CoordWeather component
//      - Implement feature to give users the possibility of also typing in a city name, instead of just location
//      - implement class names everywhere
//      - make sure I used proptypes and default props properly
//      - write CSS for the APP, mobile first.
//      - host it on firebase and put that link on my github.


const Header = (props) => (
  <header className="header">
    <h1 className="title">Simple Weather App</h1>
  </header>
)

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route to='/' component={Header} />
          <Route exact to='/' component={CoordWeather} />
        </div>
      </Router>
    );
  }
}

export default App;
