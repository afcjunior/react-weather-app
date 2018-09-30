import React from 'react';
import PropTypes from 'prop-types'

// ☁React.js app that consults the Open Weather API and manipulates it's data to list today's weather and this week's forecast for the city you input.


function DisplayWeather ({ city = 'Some place in the world', greeting = 'Hello there.', temp = '??', clouds = '??', humidity = '??', winds = '??' }){

    const cloudEmogi = <span role='img' aria-label='cloud emogi'>☁️</span>
    const dropletEmogi = <span role='img' aria-label='water drop emogi'>💧</span>
    const windEmogi = <span role='img' aria-label='wind emogi'>🌬</span>
    const pinEmogi = <span role='img' aria-label='pin emogi'>📍</span>

    return(
      <div className="weather-container">
        <p>{pinEmogi} {city}</p>
        <h1 className="weather-temp"> {temp}°C</h1>
        <div className="weather-info">
          <p> {cloudEmogi} {clouds}%</p>
          <p> {dropletEmogi} {humidity}%</p>
          <p> {windEmogi} {winds} m/s </p>
        </div>
      </div>
    )
}

DisplayWeather.propTypes = {
  city: PropTypes.string,
  greeting: PropTypes.string,
  temp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  cloud: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  rain: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
  ]),
  winds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

export default DisplayWeather;
