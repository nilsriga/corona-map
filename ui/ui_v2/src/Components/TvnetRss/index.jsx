import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Icon,
	Divider
} from "semantic-ui-react";


class TvnetRss extends Component {


	this.state = {
		tvnetRss: []
	}

	componentWillMount() {
		
	}
	componentDidMount() {

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
			)

	}

	handleInfectedClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeInfectedIndex } = this.state
		const newIndex = activeInfectedIndex === index ? -1 : index

		this.setState({ activeInfectedIndex: newIndex })
	}

	handleFactClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeFactIndex } = this.state
		const newIndex = activeFactIndex === index ? -1 : index

		this.setState({ activeFactIndex: newIndex })
	}




	render() {
		const {
			activeFactIndex,
			activeInfectedIndex,
			infectedPeople,
			tvnetRss
		} = this.state

		return (
			<div>



			</div>
		);
	}
}

export default TvnetRss;
