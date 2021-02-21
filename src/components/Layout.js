import React from 'react';
import { Container } from 'reactstrap';

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