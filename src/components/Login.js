import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt'

import { toast } from 'react-toastify'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import './styles/login.css'
import Constants from '../Constants'

const Login = () => {
	const [validated, setValidated] = useState(false);
	const [usernameFieldValue, setUsernameFieldValue] = useState('');
	const [passwordFieldValue, setPasswordFieldValue] = useState('');

	const [, setCookie] = useCookies(['stockroom-token']);
	const history = useHistory();

	const handleUsernameChange = (event) => setUsernameFieldValue(event.target.value);
	const handlePasswordChange = (event) => setPasswordFieldValue(event.target.value);

	const handleSubmit = (event) => {
		if(!event.currentTarget.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		} else {			
			event.preventDefault();
			
			axios.get(Constants.APIRoot + 'user/login?username=' + usernameFieldValue + '&password=' + passwordFieldValue)
			.then(function(response) {
				setCookie('stockroom-token', response.data.token);

				history.push('/');
			})
			.catch(function(error) {
				if(error.response) {
					toast.error('Your username or password was incorrect. Please try again.');
				} else if(error.request) {
					toast.error('Could not sign in at this time. Please try again later.');
				}
			});
		}
	
		setValidated(true);
	}

	return (
		<div className="component-wrapper">
			<div className="login-form-holder">
				<Image src="resources/images/ece-logo.png" fluid/>
				<h1>Stockroom</h1>

				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"	
							placeholder={'red.raider'}
							value={usernameFieldValue}
							onChange={handleUsernameChange}
							required
						/>
						<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder={'password'}
							value={passwordFieldValue}
							onChange={handlePasswordChange}
							required
						/>
						<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit">
						<FontAwesomeIcon icon={faSignInAlt}/>
						{` Log In`}
					</Button>

					<Button as={Link} to="/signup" style={{float: 'right'}}>Sign Up</Button>
				</Form>
			</div>
		</div>
	);
}

export default Login;