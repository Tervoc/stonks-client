import React from 'react'
import Card from 'react-bootstrap/Card'
import format from 'date-fns/format'

const Announcement = (props) => {
	return(
		<Card className="Announcement">
			<Card.Body>
				<Card.Title>
					{props.title}
				</Card.Title>
				<Card.Text>
					{props.text}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				{`Posted: ${format(new Date(props.timestamp), 'MM/dd/yyyy \'at\' hh:mm a')} by `}
				<span style={{fontWeight: "500"}}>{props.userId}</span>
			</Card.Footer>
		</Card>
	);
}

export default Announcement;