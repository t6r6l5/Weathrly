import '../Styles/10-Day-Forecast.scss';
import React, { Component } from 'react';

class TenDayForecast extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.tenDay); 
    return (
      <div className="TenDay">
        10 day Component
      </div>
    )
  }
}

export default TenDayForecast;