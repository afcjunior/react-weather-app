import React, { Component } from 'react';
import PropTypes from 'prop-types'

// ☁React.js app that consults the Open Weather API and manipulates it's data to list today's weather and this week's forecast for the city you input.
function CurrentWeather ({ city, greeting, wTemp, wTempMin, wTempMax }){
    return(
      <div className="CW-container">
        <p className="CW-title"> {greeting}. I can see you're in {city}. Currently, it's</p>
        <h1>{wTemp}°C</h1>
        <p>Min: {wTempMin}°C  |  Max: {wTempMax}°C</p>
      </div>
    )
}

CurrentWeather.propTypes = {
  city: PropTypes.string,
  greeting: PropTypes.string.isRequired,
  wTemp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  wTempMin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wTempMax: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
  ]),
}

CurrentWeather.defaultProps = {
  city: 'some place',
  greeting: 'Hello there',
}

class CoordWeather extends Component {
  static propTypes = {

  }
  state = {
    city: '',
    hour: new Date().getHours(),
    lat: 0,
    long: 0,
    weatherReport: {},
    temp: 0,
    tempMax: 0,
    tempMin: 0,
  }



  //'business logic' within a component is yucky, but this is too small an app to justify redux, so here we are.

  componentDidMount(){
    //Setting coordinates with navigator
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude.toFixed(5),
          long: position.coords.longitude.toFixed(5)
        }, () => {
          this.fetchTempByCoords()
          this.fetchCityByCoords()
        })
      })
    }else{
      alert ('It seems Geolocation is not supported in this browser. Or you didn\'t want to share your location.')
    }
  }


  timedGreeting = () => {

    let time = this.state.hour
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

  fetchTempByCoords(){
    const apiKey = '94c7881d7a313a4302d72481a447493e'
    let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
    let lat = this.state.lat
    let lon = this.state.long

    fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => response.json())
        .then(data => {
          this.setState({
            weatherReport: data,
            temp: (data.main.temp - 273.15).toFixed(0),
            tempMax: (data.main.temp_max - 273.15).toFixed(0),
            tempMin: (data.main.temp_min - 273.15).toFixed(0)
          })
        })
  }

  fetchCityByCoords(){
    const googleKey = "AIzaSyAlbp2id3ljopVjirSfDd0zKq-JOaCtnZg"
    let baseURLL = 'https://maps.googleapis.com/maps/api/geocode/json?'
    let lat = this.state.lat
    let lon = this.state.long

    //console.log(`${baseURLL}latlng=${lat},${lon}&key=${googleKey}`)

    fetch(`${baseURLL}latlng=${lat},${lon}&key=${googleKey}`)
      .then(response => response.json())
        .then(data => {
          this.setState({city: data.results[3].formatted_address.split('-')[0]})
        })
  }

  render() {
    return (
      <div className="CoordWeather">

        <CurrentWeather
          city={this.state.city}
          greeting={this.timedGreeting()}
          wTemp={this.state.temp}
          wTempMax={this.state.tempMax}
          wTempMin={this.state.tempMin}
        />

      </div>
    );
  }
}

export default CoordWeather;
