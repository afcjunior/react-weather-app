import React, { Component } from 'react';
import '../css/App.css';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom'
import CoordWeather from './CoordWeather'
// ☁React.js app that consults the Open Weather API and manipulates it's data to list today's weather and this week's forecast for the city you input.

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
