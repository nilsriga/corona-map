import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Icon,
	Divider
} from "semantic-ui-react";
import MainMap from "./Components/GoogleMap";
import Twitter from './Components/Twitter';
import "./Home.css"



class Home extends Component {


	state = {
		activeInfectedIndex: -1,
		activeFactIndex: -1,
		infectedPeople: [],
		tvnetRss: []
	}

	componentWillMount() {
		
		fetch( `${process.env.REACT_APP_API_HOST}`)
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

	componentDidMount() {


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
			<Segment inverted>
				<Grid divided stackable>
					<Grid.Row>



						<Grid.Column stackable width={3} divided  >

							<Header inverted as="h4">SPKC Twittera Tvīti</Header>
							<Twitter />

							<Header inverted as="h4">TvNET Korona Ziņas</Header>
							<Twitter />

						</Grid.Column>



						<Grid.Column stackable width={10} >

							<Segment raised style={{ padding: "0" }}>
								<MainMap />
							</Segment>

						</Grid.Column>




						<Grid.Column width={3} divided >

							<Grid.Row >

								<Header as="h4" inverted>Inficēšanās</Header>



								<div style={{ overflow: 'auto', maxHeight: 50 + "vh" }}>
									{
										infectedPeople.map((el, i) => {
											return (

												<Accordion key={Math.random() * i + 0} inverted styled>


													<Accordion.Title className={"accordion-title"} inverted active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
														<Icon  corner name='dropdown' />
														{el.label ? el.label + ", " + el.origin : ""}
													</Accordion.Title>
													<Accordion.Content style={{ color: "black" }} className={"accordion-content"} active={activeInfectedIndex === i}>


														{el.origin ? <li>Izcelsme: {el.origin}</li> : ""}
														{el.totalInfected ? <li>Inficētais Nr.: {el.totalInfected}</li> : ""}
														{el.dateOfFirstContactWIthLatvia ? <li>Pirmais Kontakts ar Latviju: {el.dateOfFirstContactWIthLatvia}</li> : ""}
														{el.dateOfDiagnosisBroadcast ? <li>Izsludināšanas Datums: {el.dateOfDiagnosisBroadcast}</li> : ""}
														{el.descriptionTitle ? <li>Īsumā: {el.descriptionTitle}</li> : ""}
														{el.descriptionHeader ? <li>{el.descriptionHeader}</li> : ""}
														{el.link ? <li><a href={el.link}>{el.link}</a></li> : ""}
														{el.extraLink1 ? <li><a href={el.extraLink1}>{el.extraLink1}</a></li> : ""}
														{el.extraLink2 ? <li><a href={el.extraLink2}>{el.extraLink1}</a></li> : ""}
														{el.extraLink3 ? <li><a href={el.extraLink3}>{el.extraLink1}</a></li> : ""}


													</Accordion.Content>


												</Accordion>

											)

										})
									}
								</div>


							</Grid.Row>


							<Grid.Row>

								<Header as="h4" inverted >COVID-19 Fakti</Header>


								<div style={{ overflow: 'auto', maxHeight: 50 + "vh" }}>


									<Accordion style={{ overflow: 'auto', maxHeight: 40 + "vh" }} inverted styled>


										<Accordion.Title className={"accordion-title"} inverted active={activeFactIndex === 0} index={0} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#60 Inficētais
         							 </Accordion.Title>
										<Accordion.Content style={{ overflow: 'auto', maxHeight: 25 + "vh" }} active={activeFactIndex === 0}>
											Info:...
									</Accordion.Content>



										<Accordion.Title className={"accordion-title"} inverted active={activeFactIndex === 1} index={1} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#59 Inficētais
        						    </Accordion.Title>
										<Accordion.Content active={activeFactIndex === 1}>
											Info:...
									</Accordion.Content>



										<Accordion.Title className={"accordion-title"} inverted active={activeFactIndex === 2} index={2} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#58 Inficētais
         							</Accordion.Title>
										<Accordion.Content active={activeFactIndex === 2}>
											Info:...
									</Accordion.Content>


									</Accordion>

								</div>
							</Grid.Row>

						</Grid.Column>



					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Home;
