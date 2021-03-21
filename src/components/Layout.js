import React from 'react'
import Container from 'react-bootstrap/Container'

const Layout = (props) => {
	return (
		<React.Fragment>
			<Container>
				{props.children}
			</Container>
		</React.Fragment>
	);
}

export default Layout;