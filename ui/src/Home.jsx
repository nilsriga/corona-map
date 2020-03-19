import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Comment,
	Icon,
	Divider
} from "semantic-ui-react";
import MainMap from "./Components/GoogleMap";
import Twitter from './Components/Twitter';
import moment from "moment"
import "./Home.css"
// import TvnetRss from "./Components/TvnetRss"



class Home extends Component {


	state = {
		activeInfectedIndex: -1,
		activeTvnetIndex: -1,
		activeFactIndex: -1,
		infectedPeople: [],
		tvnetRss: [],
		facts: []
	}

	componentWillMount() {

		
	}
	
	componentDidMount() {
		fetch(process.env.REACT_APP_API_HOST + "/facts")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({facts: result})
				},
				(error) => {
					console.log(error)
					this.state.facts = error
				}
			)
	
	
		fetch(process.env.REACT_APP_API_HOST + "/tvnet")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({tvnetRss: result})
				},
				(error) => {
					console.log(error)
					this.state.tvnetRss = error
				}
			)
	
		fetch(`${process.env.REACT_APP_API_HOST}`)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({infectedPeople: result.reverse()})
				},
				(error) => {
					console.log(error)
					this.state.infectedPeople = error
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

	handleTvnetClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeTvnetIndex } = this.state
		const newIndex = activeTvnetIndex === index ? -1 : index

		this.setState({ activeTvnetIndex: newIndex })
	}

	handleFactsClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeFactIndex } = this.state
		const newIndex = activeFactIndex === index ? -1 : index

		this.setState({ activeFactIndex: newIndex })
	}


	render() {
		const {
			activeInfectedIndex,
			activeTvnetIndex,
			activeFactIndex,
			infectedPeople,
			tvnetRss,
			facts
		} = this.state

		return (
			<Segment inverted>
				<Grid divided stackable>
					<Grid.Row>



						<Grid.Column stackable width={3} divided  >



							<Header inverted as="h4">SPKC Twittera Tvīti</Header>
							<Twitter />




							<Header inverted as="h4">TvNet Korona Ziņas</Header>

							<div style={{ overflow: 'auto', maxHeight: 32 + "vh" }}>
								{tvnetRss.map((el, i) => {
									return <Accordion key={Math.random() * i + 0} inverted styled>

										<Accordion.Title className={"accordion-title"} inverted active={activeTvnetIndex === i} index={i} onClick={this.handleTvnetClick}>
											<Icon corner name='dropdown' />
											{el.title}
											<br></br>
											{moment(el.pubDate).fromNow()}

										</Accordion.Title>

										<Accordion.Content href={el.link} style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeTvnetIndex === i}>
											{el.content}
										</Accordion.Content>

									</Accordion>
								})}
							</div>

						</Grid.Column>



						<Grid.Column stackable width={10} >

							<Header as="h3" inverted textAlign={"center"} >Nometne "Štābiņš" Mājās {new Date().getFullYear()}</Header>

							<Segment raised style={{ padding: "0" }}>
								<MainMap />
							</Segment>

						</Grid.Column>




						<Grid.Column width={3} divided >


							<Header as="h4" inverted>Inficēšanās</Header>



							<div style={{ overflow: 'auto', maxHeight: 50 + "vh" }}>
								{
									infectedPeople.map((el, i) => {
										return (
											<Accordion key={Math.random() * i + 0} inverted styled>


												<Accordion.Title className={"accordion-title"} inverted active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
													<Icon corner name='dropdown' />
													{el.label ? el.label + ", " + el.origin : ""}
												</Accordion.Title>

												<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeInfectedIndex === i}>

													{el.origin ? <li>Izcelsme: {el.origin}</li> : ""}
													{el.totalInfected ? <li>Inficētais Nr.: {el.totalInfected}</li> : ""}
													{el.dateOfFirstContactWIthLatvia ? <li>Pirmais Kontakts ar Latviju: {el.dateOfFirstContactWIthLatvia}</li> : ""}
													{el.dateOfDiagnosisBroadcast ? <li>Izsludināšanas Datums: {el.dateOfDiagnosisBroadcast}</li> : ""}
													{el.descriptionTitle ? <li>Īsumā: {el.descriptionTitle}</li> : ""}
													{el.descriptionHeader ? <li>{el.descriptionHeader}</li> : ""}
													{el.link ? <li><a href={el.link}>{el.link}</a></li> : ""}
													{el.extraLink1 ? <li><a href={el.extraLink1}>{el.extraLink1}</a></li> : ""}
													{el.extraLink2 ? <li><a href={el.extraLink2}>{el.extraLink2}</a></li> : ""}
													{el.extraLink3 ? <li><a href={el.extraLink3}>{el.extraLink3}</a></li> : ""}

												</Accordion.Content>


											</Accordion>
										)

									})
								}
							</div>



							<Header inverted as="h4">Korona/COVID-19 Fakti</Header>
							<div style={{ overflow: 'auto', maxHeight: 32 + "vh" }}>
								{facts.map((el, i) => {
									return <Accordion key={Math.random() * i + 0} inverted styled>

										<Accordion.Title className={"accordion-title"} inverted active={activeFactIndex === i} index={i} onClick={this.handleFactClick}>
											<Icon corner name='dropdown' />
											{el.title}
										</Accordion.Title>

										<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeFactIndex === i}>
											{el.content}
											<br></br>
											<a href={el.link1 || "http://google.com"}>{el.linkTitle1 || "resurss" }</a>
										</Accordion.Content>

									</Accordion>
								})}
							</div>




						</Grid.Column>

					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Home;
