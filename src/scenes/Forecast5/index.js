import React, { Component } from 'react';
import moment from 'moment';
import { fetchForecastByCityName } from 'services/openweathermap';
//import Alert from 'react-s-alert';
import ForecastView from './components/ForecastView';

class Forecast5 extends Component {

	state = {
		loading: false,
		forecast: [],
		cityName:"",
		load:false
	}

	getForecastData() {
		var that = this;
	 console.log("cityName",this.state.cityName);
	 this.setState({ loading: true,load:true});
	 fetchForecastByCityName(this.state.cityName).then(function(res){
    console.log(res.data);
		that.setState({
			loading: false,
			forecast: res.data.list.map(item => ({
				date: moment(item.dt * 1000),
				temp: item.main.temp,
				humidity: item.main.humidity,
				weather: item.weather[0],
			}))
		});
    //console.log("inside then");
	 }).catch(function(err){

     //console.log("err",err);
		 alert("city does not exist");
		 that.setState({
			loading: false,
 			forecast: [],
 			cityName:"",
 			load:false
	   });
		 location.reload();
	 })
	}

	handleChange(e) {
   e.preventDefault();
   this.getForecastData();

	}

	renderForm() {
    return(
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter city"
              onChange={event => this.setState({cityName: event.target.value})}/>
          </div>
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => this.handleChange(e)}>
            Submit
          </button>
        </div>
      </div>
    )
  }

renderForcast(){
	return(
		      <ForecastView
						 cityName={this.cityName}
						 forecast={this.state.forecast}
						 loading={this.state.loading}
						 onPressRefresh={() => this.getForecastData()}
			/>)
}
	render() {
         var forcastComponent;
				 if(this.state.load){
					 forcastComponent= this.renderForcast();
				 }

		return (
			<div>
		   {this.renderForm()}
			  {forcastComponent}
		 </div>
		);
	}
}

export default Forecast5;
