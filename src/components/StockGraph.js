/*
 * Author(s): Parrish, Christian christian.parrish@ttu.edu
 * Date Created: March 16 2021
 * Notes: N/A
*/
import Constants from '../Constants'
import React, { Component, useState, useEffect } from "react"
import CanvasJSReact from './canvasjs.stock.react'
import axios from 'axios'
var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

const calculateSMA = (dps, count) => {
	var avg = (dps) =>{
		var sum = 0, count = 0, val;
		for (var i = 0; i < dps.length; i++) {
		val = dps[i].y[3]; sum += val; count++;
		}
		return sum / count;
	};
	var result = [], val;
	count = count || 5;
	for (var i=0; i < count; i++)
		result.push({ x: dps[i].x , y: null});
	for (var i=count - 1, len=dps.length; i < len; i++){
		val = avg(dps.slice(i - count + 1, i));
		if (isNaN(val))
		result.push({ x: dps[i].x, y: null});
		else
		result.push({ x: dps[i].x, y: val});
	}
	return result;

}

const getPrediction = (ticker, timespan) => {
	var result = [];
	axios.get(Constants.APIRoot + "prediction/price/" + ticker + "?timespanId=" + timespan)
	.then ((response) => {
		var data = response.data;
		for (var i = 0; i < data.length; i++) {
			result.push({x: data[i].closeTimestamp, y: data[i].close});
		}
	}
	);
	return result;
}

class ExampleGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {prediction: [], sma8: [], sma50: [], sma200: [], dataPoints1: [], dataPoints2: [], dataPoints3: [], tickerId: 1, companyName: "", timespanId: 1, isLoaded: true};
	}

	componentDidMount() {
		axios.get(Constants.APIRoot + "pricePoint/price/" + this.props.tickerId + "?timespanId=" + this.props.timespanId)
		.then(
			(response) => {
				var data = response.data;
				var dps1 = [], dps2 = [], dps3 = [];
				for (var i = 0; i < data.length; i++) {
					dps1.push({
						x: new Date(data[i].closeTimestamp),
						y: [
							Number(data[i].open),
							Number(data[i].high),
							Number(data[i].low),
							Number(data[i].close)
						]
					});
					dps2.push({ x: new Date(data[i].closeTimestamp), y: Number(data[i].volume) });
					dps3.push({ x: new Date(data[i].closeTimestamp), y: Number(data[i].close) });
				}
				this.setState({
					isLoaded: true,
					dataPoints1: dps1,
					dataPoints2: dps2,
					dataPoints3: dps3,
					tickerId: this.props.tickerId,
					timespanId: this.props.timespanId,
					sma8: calculateSMA(dps1, 8),
					sma50: calculateSMA(dps1, 50),
					prediction: getPrediction(this.props.tickerId, this.props.timespanId)
				});
			}
		);
		axios.get(Constants.APIRoot + "resource/ticker")
		.then(
			(response) => {
				this.setState({
					companyName: response.data[this.state.tickerId-1].companyName
				});
			}
		);
	}

	
	componentDidUpdate(nextProps) {
		if( (this.props.tickerId !== this.state.tickerId || this.props.timespanId !== this.state.timespanId)) {
			axios.get(Constants.APIRoot + "pricePoint/price/" + nextProps.tickerId + "?timespanId=" + nextProps.timespanId)
			.then(
				(response) => {
					var data = response.data;
					var dps1 = [], dps2 = [], dps3 = [];
					for (var i = 0; i < data.length; i++) {
						dps1.push({
							x: new Date(data[i].closeTimestamp),
							y: [
								Number(data[i].open),
								Number(data[i].high),
								Number(data[i].low),
								Number(data[i].close)
							]
						});
						dps2.push({ x: new Date(data[i].closeTimestamp), y: Number(data[i].volume) });
						dps3.push({ x: new Date(data[i].closeTimestamp), y: Number(data[i].close) });
					}
					this.setState({
						isLoaded: true,
						dataPoints1: dps1,
						dataPoints2: dps2,
						dataPoints3: dps3,
						tickerId: nextProps.tickerId,
						timespanId: nextProps.timespanId,
						sma8: calculateSMA(dps1, 8),
						sma50: calculateSMA(dps1, 50),
						prediction: getPrediction(this.props.tickerId, this.props.timespanId)
					});
				}
			);
			axios.get(Constants.APIRoot + "resource/ticker")
			.then(
				(response) => {
					this.setState({
						companyName: response.data[this.state.tickerId-1].companyName
					});
				}
			);
		}
	}

	render() {
		const options = {
			theme: "light2",
			title: {
				text: this.state.companyName,
				fontSize: 30
			},
			charts: [{
				height: 400,
				axisX: {
					lineThickness: 1,
					tickLength: 0,
					labelFormatter: function (e) {
						return "";
					},
					crosshair: {
						enabled: true,
						snapToDataPoint: true,
						labelFormatter: function (e) {
							return "";
						}
					}
				},
				axisY: {
					title: this.state.companyName + " Price",
					prefix: "$",
					tickLength: 0
				},
				toolTip: {
					shared: true
				},
				data: [{
					name: "Price (in USD)",
					yValueFormatString: "$#,###.##",
					type: "candlestick",
					color: "#000000",
					dataPoints: this.state.dataPoints1
				},{ 
					type: "line", 
					dataPoints: this.state.sma8, 
					showInLegend: true, 
					yValueFormatString: "$#,###.##", 
					name: "Moving Average (8)"
				},{ 
					type: "line", 
					dataPoints: this.state.sma50, 
					showInLegend: true, 
					yValueFormatString: "$#,###.##", 
					name: "Moving Average (50)"
				},{ 
					type: "line", 
					markerSize: 0,
					color: "cyan",
					dataPoints: this.state.prediction, 
					showInLegend: true, 
					yValueFormatString: "$#,###.##", 
					name: "Machine Learning Prediction"
				}]
			}, {
				height: 100,
				axisX: {
					crosshair: {
						enabled: true,
						snapToDataPoint: true
					}
				},
				axisY: {
					title: "Volume",
					prefix: "$",
					tickLength: 0
				},
				toolTip: {
					shared: true
				},
				data: [{
					name: "Volume",
					yValueFormatString: "$#,###.##",
					type: "column",
					dataPoints: this.state.dataPoints2
				}]
			}],
			navigator: {
				height: 50,
				data: [{
					dataPoints: this.state.dataPoints3
				}],
				slider: {
					//minimum: new Date(this.state.dataPoints1[0].date),
					//maximum: new Date(this.state.dataPoints1[this.state.dataPoints1.length() - 1].date)
				}
			}
		};

		const containerProps = {
			width: "100%",
			height: "640px",
			margin: "auto"
		};
		
		

		// options.charts[0].addTo("data", { 
		// 	type: "line", 
		// 	dataPoints: this.state.sma, 
		// 	showInLegend: true, 
		// 	yValueFormatString: "$#,###.##", 
		// 	name: "Simple Moving Average"
		// })

		return (
			<React.Fragment>
				{
					// Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
					this.state.isLoaded &&
					<CanvasJSStockChart containerProps={containerProps} options={options}
					/* onRef = {ref => this.chart = ref} */
					/>
				}
			</React.Fragment>
		);
	}
}
export default ExampleGraph;
// export default StockGraph;