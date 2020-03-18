import React from 'react';

fetch(process.env.REACT_APP_API_HOST + "/tvnet")
	.then(res => res.json())
	.then(
		(result) => {
			this.setState({ infectedPeople: result.reverse() })
		},
		(error) => {
			console.log(error)
			this.setState({ infectedPeople: error })
		}
	);






const tvnet = () => {



	return (
		<>



		</>

	);


};

export default tvnet;
