import '../Styles/7-Hour-Forecast.scss';
import React, { Component } from 'react';

class SevenHourForecast extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.sevenHour);
    
    return (
      <div className="SevenHour">
        7 Hour Component
      </div>
    )
  }
}

export default SevenHourForecast;