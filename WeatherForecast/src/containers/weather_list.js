import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const temps = cityData.list.map(weather => weather.main.temp);
        const press = cityData.list.map(weather => weather.main.pressure);
        const humid = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={cityData.city.id} >
                {/* <td>{cityData.city.name}</td> */}
                <td><GoogleMap lat={lat} lon={lon} /></td>
                <td>
                    <Chart color="blue" data={temps} units="K" />
                </td>
                <td>
                    <Chart color="green" data={press} units="hPa" />
                </td>
                <td>
                    <Chart color="red" data={humid} units="%" />
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover" >
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps)(WeatherList);
