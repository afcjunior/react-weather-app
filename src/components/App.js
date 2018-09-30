import React, { Component } from 'react';
import '../css/App.css';
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MainWeather from './MainWeather'
import InputWeather from './InputWeather'

// ☁React.js, React-Router app that consults both Open Weather and Google Maps' APIs, and gives you today's forecast based on your location. You can also input other cities by typing their names in.

/*

TODO:

  - Finish my inputfield and inputweather components so the user can type in a city.
    -figure out a way to have inputweather work without a button. On mobile AND web - just type in a city and press enter.

  - host it on firebase to play with.

IDEAS:
  -Give users the ability to favorite certain cities. Have a 'favourite cities' screen displaying all their temps. Save their preferences in cookies. Make this a PWA.
  -Add API redudancies so I still get weather info even if openweather is down.
  -Review this app with someone more experienced.

*/




class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={MainWeather} />
            <Route exact path='/input' component={InputWeather} />
            <Route render={() => (
              <div>
                <Link to='/'>Oops. You seem to be lost. Click here to go back home.</Link>
              </div>
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
