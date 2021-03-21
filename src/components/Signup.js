import React, { useState/*, useEffect*/ } from 'react'
import { Link, useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
//import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'

import './styles/signup.css'
import Constants from '../Constants'

import { toast } from 'react-toastify'
import axios from 'axios'

const Signup = () => {
	const history = useHistory();

	const [validated, setValidated] = useState(false);

	const [usernameFieldValue, setUsernameFieldValue] = useState('');
	const [emailFieldValue, setEmailFieldValue] = useState('');
	const [passwordFieldValue, setPasswordFieldValue] = useState('');

	const handleUsernameChange = (event) => setUsernameFieldValue(event.target.value);
	const handleEmailChange = (event) => setEmailFieldValue(event.target.value);
	const handlePasswordChange = (event) => setPasswordFieldValue(event.target.value);

	const [showRegSpinner, setShowRegSpinner] = useState(false);

	const handleSubmit = (event) => {
		if(!event.currentTarget.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		} else {			
			event.preventDefault();
			setShowRegSpinner(true);

			axios.post(Constants.APIRoot + 'user', {
				username: usernameFieldValue,
				password: passwordFieldValue,
				email: emailFieldValue
				
			})
			.then(function(response) {
				toast.success('Successfully created your account! Returning to login...');
				
				setShowRegSpinner(false);

				setTimeout(() => history.push('/login'), 2000);
			})
			.catch(function(error) {
				toast.error('Could not register at this time. Please try again later.');

				setShowRegSpinner(false);
			});
		}
	
		setValidated(true);
	}

	return (
		<div className="component-wrapper">
			<div className="form-holder">
				<Image src="resources/images/crisp_head_flatter.png" fluid/>
				<h1>Stonks</h1>
				<p><b>New Account</b></p>
				<p>Already have an account? <Link to={'/login'}>Log in</Link></p>

				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder={'Splatopotamus'}
								value={usernameFieldValue}
								onChange={handleUsernameChange}
								maxLength={'50'}
								required
							/>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email Address</Form.Label>
								<Form.Control
									type="text"
									placeholder={'abc123@abc.com'}
									value={emailFieldValue}
									onChange={handleEmailChange}
									required
								/>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder={'password'}
								value={passwordFieldValue}
								onChange={handlePasswordChange}
								pattern={'[a-zA-Z0-9!@#$%^&*]{8,64}'}
								required
							/>
							<Form.Control.Feedback type="invalid">Password must be between 8 and 64 characters and can only contain uppercase characters, lowercase characters, numbers, and the following: !, @, #, $, %, ^, &amp;, *.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					
					<div style={{display: 'flex', alignItems: 'center'}}>
						<Button type="submit">Submit</Button>
						<Spinner hidden={!showRegSpinner} style={{marginLeft: '10px'}} animation="border"><span className="sr-only">Loading...</span></Spinner>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Signup;