import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt'

import { toast } from 'react-toastify'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import './styles/login.css'
import Constants from '../Constants'
import StockGraph from './StockGraph'

const StockGraphInput = () => {
	const [validated, setValidated] = useState(false);
	const [tickerFieldValue, setTickerFieldValue] = useState(1);
	const [timespanFieldValue, setTimespanFieldValue] = useState(1);

	//const [, setCookie] = useCookies(['stonks-token']);
	//const [, setTickerCookie] = useCookies(['stonks-tickerId']);
	//const [, setTimespanCookie] = useCookies(['stonks-timespanId']);
	const history = useHistory();

	const handleTickerChange = (event) => setTickerFieldValue(event.target.value);
	const handleTimespanChange = (event) => setTimespanFieldValue(event.target.value);

	const [tickers, setTickers] = useState([]);
	const [timespans, setTimespans] = useState([]);

	useEffect(() => {
		axios.get(Constants.APIRoot + 'resource/ticker')
		.then(function(response) {
			setTickers(response.data.map((ticker) =>
				<option key={ticker.tickerId} value={ticker.tickerId}>{ticker.name}</option>
			));
		})
		.catch(function(error) {
			toast.error('Could not load tickers right now. Please try again later.');
		});
		axios.get(Constants.APIRoot + 'resource/timespan')
		.then(function(response) {
			setTimespans(response.data.map((timespan) =>
				<option key={timespan.timespanId} value={timespan.timespanId}>{timespan.name}</option>
			));
		})
		.catch(function(error) {
			toast.error('Could not load timespans right now. Please try again later.');
		});
	}, []);

	return (
			<div>
				<Form noValidate validated={validated}>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Ticker</Form.Label>
                            <Form.Control
                                as="select"
								custom
								onChange={handleTickerChange}
                                value={tickerFieldValue}
								placeholder={'Select a ticker...'}
                                required
                            >
								{ tickers }
							</Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Timespan</Form.Label>
                            <Form.Control
                                as="select"
								custom
								onChange={handleTimespanChange}
                                value={timespanFieldValue}
								placeholder={'Select a timespan...'}
                                required
                            >
								{ timespans }
							</Form.Control>
                        </Form.Group>
                    </Form.Row>
				</Form>
				
				<StockGraph tickerId={tickerFieldValue} timespanId={timespanFieldValue}/>
			</div>
		
	);
}

export default StockGraphInput;