import React from 'react'
//import Announcement from './Announcement'
import StockGraph from './StockGraph'
import StockGraphInput from './StockGraphInput';

/*<Announcement
				title="Example Thing"
				text="GME TO THE MOON"			
				timestamp="2020-12-23 23:12:32.4567"
				userId="Jackmerius Tacktheritrix"
				<StockGraph tickerId="1" timespanId='1'/>
			/>*/

const Home = () => {
	return (
		<div>
			<StockGraphInput/>
			
		</div>
	);
}

export default Home;