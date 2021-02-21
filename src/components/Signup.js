import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'

import './styles/signup.css'
import Constants from '../Constants'

import { toast } from 'react-toastify'
import axios from 'axios'

const Signup = () => {
	const history = useHistory();

	const [validated, setValidated] = useState(false);

	const [usernameFieldValue, setUsernameFieldValue] = useState('');
	const [techIdFieldValue, setTechIdFieldValue] = useState('');
	const [emailFieldValue, setEmailFieldValue] = useState('');
	const [firstNameFieldValue, setFirstNameFieldValue] = useState('');
	const [lastNameFieldValue, setLastFieldValue] = useState('');
	const [labFieldValue, setLabFieldValue] = useState('');
	const [classificationFieldValue, setClassificationFieldValue] = useState(true);
	const [majorFieldValue, setMajorFieldValue] = useState('');
	const [countryCodeFieldValue, setCountryCodeFieldValue] = useState('1');
	const [phoneFieldValue, setPhoneFieldValue] = useState('');
	const [passwordFieldValue, setPasswordFieldValue] = useState('');

	const handleUsernameChange = (event) => setUsernameFieldValue(event.target.value);
	const handleTechIdChange = (event) => setTechIdFieldValue(event.target.value);
	const handleEmailChange = (event) => setEmailFieldValue(event.target.value);
	const handleFirstNameChange = (event) => setFirstNameFieldValue(event.target.value);
	const handleLastNameChange = (event) => setLastFieldValue(event.target.value);
	const handleLabChange = (event) => setLabFieldValue(event.target.value);
	const handleClassificationChange = (event) => setClassificationFieldValue(event.target.value);
	const handleMajorChange = (event) => setMajorFieldValue(event.target.value);
	const handleCountryCodeChange = (event) => setCountryCodeFieldValue(event.target.value);
	const handlePhoneChange = (event) => setPhoneFieldValue(event.target.value);
	const handlePasswordChange = (event) => setPasswordFieldValue(event.target.value);

	const [majors, setMajors] = useState([]);
	const [courses, setCourses] = useState([]);

	const [showRegSpinner, setShowRegSpinner] = useState(false);

	const handleSubmit = (event) => {
		if(!event.currentTarget.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		} else {			
			event.preventDefault();
			setShowRegSpinner(true);

			axios.post(Constants.APIRoot + 'user', {
				techId: techIdFieldValue,
				password: passwordFieldValue,
				username: usernameFieldValue,
				email: emailFieldValue + '@ttu.edu',
				firstName: firstNameFieldValue,
				lastName: lastNameFieldValue, 
				phoneCountryCode: countryCodeFieldValue,
				phoneNumber: phoneFieldValue, 
				undergraduateFlag: classificationFieldValue,
				labCourseId: parseInt(labFieldValue),
				majorId: parseInt(majorFieldValue)
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

	useEffect(() => {
		axios.get(Constants.APIRoot + 'resource/major')
		.then(function(response) {
			setMajors(response.data.map((major) => 
				<option key={major.majorId} value={major.majorId}>{major.name}</option>
			));
		})
		.catch(function(error) {
			toast.error('Could not load majors right now. Please try again later.');
		});

		axios.get(Constants.APIRoot + 'resource/course')
		.then(function(response) {
			setCourses(response.data.map((course) => 
				<option key={course.labCourseId} value={course.labCourseId}>{course.name}</option>
			));
		})
		.catch(function(error) {
			toast.error('Could not load majors right now. Please try again later.');
		});
	}, []);

	return (
		<div className="component-wrapper">
			<div className="form-holder">
				<Image src="resources/images/ece-logo.png" fluid/>
				<h1>Stockroom</h1>
				<p><b>New Account</b></p>
				<p>Already have an account? <Link to={'/login'}>Log in</Link></p>

				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder={'raider.red'}
								value={usernameFieldValue}
								onChange={handleUsernameChange}
								required
							/>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Tech ID (R#)</Form.Label>
							<Form.Control
								type="text"
								placeholder={'00000000'}
								value={techIdFieldValue}
								onChange={handleTechIdChange}
								pattern={'[0-9]{8}'}
								maxLength={'8'}
								required
							/>
							<Form.Control.Feedback type="invalid">You must provide a valid Tech ID.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>TechMail Address</Form.Label>
							<InputGroup>
								<Form.Control
									type="text"
									placeholder={'raider.red'}
									value={emailFieldValue}
									onChange={handleEmailChange}
									required
								/>
								<InputGroup.Append>
									<InputGroup.Text>@ttu.edu</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
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
								pattern={'[a-zA-Z0-9!@#$%^&*]{8,20}'}
								required
							/>
							<Form.Control.Feedback type="invalid">Password must be between 8 and 20 characters and can only contain uppercase characters, lowercase characters, numbers, and the following: !, @, #, $, %, ^, &amp;, *.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Legal First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder={'Raider'}
								value={firstNameFieldValue}
								onChange={handleFirstNameChange}
								required
							/>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Legal Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder={'Red'}
								value={lastNameFieldValue}
								onChange={handleLastNameChange}
								required
							/>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Phone Country Code</Form.Label>
							<Form.Control
								type="text"
								placeholder={'1'}
								value={countryCodeFieldValue}
								onChange={handleCountryCodeChange}
								pattern={'[0-9-]{1,7}'}
								maxLength={'7'}
								required
							/>
							<Form.Control.Feedback type="invalid">Must be a valid country code. Omit the "+"</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								type="text"
								placeholder={'1234567890'}
								value={phoneFieldValue}
								onChange={handlePhoneChange}
								pattern={'[0-9]{1,50}'}
								required
							/>
							<Form.Control.Feedback type="invalid">Provide phone number as digits only with no spaces, dashes, or other characters. Do not include country code.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Lab Course</Form.Label>
							<Form.Control
								as="select"
								custom
								value={labFieldValue}
								onChange={handleLabChange}
								required
							>
								{ courses }
							</Form.Control>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Classification</Form.Label>
							<Form.Control
								as="select"
								custom
								value={classificationFieldValue}
								onChange={handleClassificationChange}
								required
							>
								<option value={true}>Undergraduate</option>
								<option value={false}>Graduate</option>
							</Form.Control>
							<Form.Control.Feedback type="invalid">Field cannot be empty.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Major</Form.Label>
							<Form.Control
								as="select"
								custom
								value={majorFieldValue}
								onChange={handleMajorChange}
								placeholder={'Make a selection...'}
								required
							>
								{ majors }
							</Form.Control>
							<Form.Control.Feedback type="invalid">You must choose a major.</Form.Control.Feedback>
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