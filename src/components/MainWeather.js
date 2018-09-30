import React, { Component } from 'react';
import DisplayWeather from './DisplayWeather'
// ☁React.js app that consults the Open Weather API and manipulates it's data to list today's weather and this week's forecast for the city you input.
const InputField = () => (
  <div className="input-button">
    {/* <label className="inp">
      <input type="text" id="city" placeholder="&nbsp;"/>
      <span className="label">Or enter a different city...</span>
      <span className="border"></span>
    </label>
    <input type="button"/> */}
    custom input disabled for now

  </div>
)

class MainWeather extends Component {

  state = {
    city: '',
    hour: new Date(),
    lat: 0,
    long: 0,
    temp: 0,
    clouds: 0,
    humidity: 0,
    winds: 0,
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
      alert ('It seems Geolocation is not supported in this browser, so this won\'t work here. Sorry.')
    }
  }


  timedGreeting = () => {

    let time = this.state.hour.getHours()
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
          console.log(data)
          this.setState({
            weatherReport: data,
            temp: (data.main.temp - 273.15).toFixed(0),
            clouds: data.clouds.all,
            humidity: data.main.humidity,
            winds: data.wind.speed,


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
      <div className="main-weather-container">

        <DisplayWeather
          temp={this.state.temp}
          clouds={this.state.clouds}
          humidity={this.state.humidity}
          winds={this.state.winds}
          city={this.state.city}
          greeting={this.timedGreeting()}

        />

        <InputField/>



      </div>
    );
  }
}

export default MainWeather;
