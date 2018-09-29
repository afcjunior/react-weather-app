import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom'
import PropTypes from 'prop-types'

// ☁React.js app that consults the Open Weather API and manipulates it's data to list today's weather and this week's forecast for the city you input.
export function CurrentWeather ({ city, greeting}){


    return(
      <div className="CW-container">
        <p className="CW-title"> {greeting}. I can see you're in {city}. Currently, it's</p>
        <h1>{}° C</h1>
      </div>
    )
}

class App extends Component {
  state = {
    date: new Date(),

  }

  timedGreeting = () => {

    let time = this.state.date.getHours()
    let greeting = ''

    if (time >= 3 && time < 12){
      greeting = "Good Morning"
    }
    else if (time >= 12 && time < 17){
      greeting = "Good Afternoon"
    }
    else if (time >= 17 && time < 20){
      greeting = "Good Evening"
    }
    else if (time >= 20){
      greeting = "Good Night"
    } else if (time < 3){
      greeting = "Good Night"
    }
    return greeting
  }

  getCoordinates = () => {
    const googleKey = "AIzaSyAlbp2id3ljopVjirSfDd0zKq-JOaCtnZg"

    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        fetch(``)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CurrentWeather
          city="Natal"
          greeting={this.timedGreeting()}
        />
      </div>
    );
  }
}

export default App;
