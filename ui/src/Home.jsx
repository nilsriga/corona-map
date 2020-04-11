"strict"
import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Icon,
	Button,
	Embed,
	Modal,
	Label,
} from "semantic-ui-react"
import MainMapWithPolylines from "./Components/GoogleMap/GoogleMapWithPolylines"
import MainMapWithoutPolylines from "./Components/GoogleMap/GoogleMapWithoutPolylines"
import SKPCMap from "./Components/SKPCMap/SKPCMap"
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import moment from "moment"
import jwt from "jsonwebtoken"
import axios from "axios"
import "./Home.css"
import "moment/locale/lv"
moment.locale("lv")



class Home extends Component {



	state = {
		userSettings: JSON.parse(localStorage.getItem("latvijaskoronakartesSettings")),

		storedInfectedPeople: JSON.parse(localStorage.getItem("latvijaskoronakartesInfectedPeople")),
		storedTvnetRss: JSON.parse(localStorage.getItem("latvijaskoronakartesTvnetRss")),
		storedFacts: JSON.parse(localStorage.getItem("latvijaskoronakartesFacts")),

		storedInfectedPeopleHash: localStorage.getItem("latvijaskoronakartesInfectedPeopleHash"),
		storedTvnetRssHash: localStorage.getItem("latvijaskoronakartesTvnetRssHash"),
		storedFactsHash: localStorage.getItem("latvijaskoronakartesFactsHash"),

		activeInfectedIndex: -1,
		activeTvnetIndex: -1,
		activeFactIndex: -1,
		activeFirstTvnetIndex: 0,
		activeFirstFactIndex: -1,
		activeSecondFactIndex: 0,
		activeMapAccordionIndex: 0,

		polylinesVisible: false,
		currentlyVisibleMap: "googleMap",

		infectedPeople: [],
		tvnetRss: [],
		facts: [],

		infectedPeopleHash: "",
		tvnetRssHash: "",
		factsHash: "",

		hasSeenNewInfectedPeople: false,
		hasSeenNewTvnetRss: false,
		hasSeenNewFacts: false,

		whenInfectedPeopleHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",
		whenTvnetRssHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",
		whenFactsHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",


		hasError: false,
		errorMessage: "",


		// openedInfoWindowId: {}
	}


	componentWillMount() {


		console.log("componentWillMount", this.state)
		this.setState({
			userSettings: this.state.userSettings ? this.state.userSettings : {},

			storedInfectedPeople: this.state.storedInfectedPeople ? this.state.storedInfectedPeople : [],
			storedTvnetRss: this.state.storedTvnetRss ? this.state.storedTvnetRss : [],
			storedFacts: this.state.storedFacts ? this.state.storedFacts : [],

			storedInfectedPeopleHash: this.state.storedInfectedPeopleHash ? this.state.storedInfectedPeopleHash : "",
			storedTvnetRssHash: this.state.storedTvnetRssHash ? this.state.storedTvnetRssHash : "",
			storedFactsHash: this.state.storedFactsHash ? this.state.storedFactsHash : "",


			activeFirstFactIndex: this.state.userSettings !== null && this.state.userSettings.activeFirstFactIndex ? this.state.userSettings.activeFirstFactIndex : -1,
			activeSecondFactIndex: this.state.userSettings !== null && this.state.userSettings.activeSecondFactIndex ? this.state.userSettings.activeSecondFactIndex : 0,
			activeMapAccordionIndex: this.state.userSettings !== null && this.state.userSettings.activeMapAccordionIndex ? this.state.userSettings.activeMapAccordionIndex : 0,

			polylinesVisible: this.state.userSettings !== null && this.state.userSettings.polylinesVisible ? this.state.userSettings.polylinesVisible : false,
			currentlyVisibleMap: this.state.userSettings !== null && this.state.userSettings.currentlyVisibleMap ? this.state.userSettings.currentlyVisibleMap : "googleMap",

			infectedPeople: this.state.storedInfectedPeople !== [] ? this.state.storedInfectedPeople : [],
			tvnetRss: this.state.storedTvnetRss !== [] ? this.state.storedTvnetRss : [],
			facts: this.state.storedFacts !== [] ? this.state.storedFacts : [],

			infectedPeopleHash: this.state.storedInfectedPeopleHash ? this.state.storedInfectedPeopleHash : "",
			tvnetRssHash: this.state.storedTvnetRssHash ? this.state.storedTvnetRssHash : "",
			factsHash: this.state.storedFactsHash ? this.state.storedFactsHash : "",
		})







		// if (this.state.infectedPeopleHash.length < 1 || this.state.tvnetRssHash.length < 1 || this.state.factsHash.length < 1) {
		// 	console.log("ama here")

		// 	Promise.all([
		// 		this.fetchData("/tvnet", this.state.tvnetRssHash, "tvnetRss", "tvnetRssHash", "latvijaskoronakartesTvnetRss", "latvijaskoronakartesTvnetRssHash", "whenTvnetRssHaveBeenLastUpdated", "hasSeenNewInfectedPeople", true),
		// 		this.fetchData("/facts", this.state.factsHash, "facts", "factsHash", "latvijaskoronakartesFacts", "latvijaskoronakartesFactsHash", "whenFactsHaveBeenLastUpdated", "hasSeenNewTvnetRss", true),
		// 		this.fetchData("/infected", this.state.infectedPeopleHash, "infectedPeople", "infectedPeopleHash", "latvijaskoronakartesInfectedPeople", "latvijaskoronakartesInfectedPeopleHash", "whenInfectedPeopleHaveBeenLastUpdated", "hasSeenNewFacts", true)
		// 	])
		// 		.then(([...functionExecutions]) => {
		// 			this.setState({
		// 				...functionExecutions
		// 			})
		// 		})
		// 		.catch(err => {
		// 			this.setState({ hasError: true, errorMessage: "Corona Error at getting data" })
		// 		})

		// } else {
		// 	this.fetchData("/tvnet",
		// 		this.state.tvnetRssHash,
		// 		"tvnetRss",
		// 		"tvnetRssHash",
		// 		"latvijaskoronakartesTvnetRss",
		// 		"latvijaskoronakartesTvnetRssHash",
		// 		"whenTvnetRssHaveBeenLastUpdated",
		// 		"hasSeenNewInfectedPeople",
		// 		false)

		// 	this.fetchData("/facts",
		// 		this.state.factsHash,
		// 		"facts",
		// 		"factsHash",
		// 		"latvijaskoronakartesFacts",
		// 		"latvijaskoronakartesFactsHash",
		// 		"whenFactsHaveBeenLastUpdated",
		// 		"hasSeenNewTvnetRss",
		// 		false)

		// 	this.fetchData("/infected",
		// 		this.state.infectedPeopleHash,
		// 		"infectedPeople",
		// 		"infectedPeopleHash",
		// 		"latvijaskoronakartesInfectedPeople",
		// 		"latvijaskoronakartesInfectedPeopleHash",
		// 		"whenInfectedPeopleHaveBeenLastUpdated",
		// 		"hasSeenNewFacts",
		// 		false)
		// }




	}


	componentDidMount() {

		// Promise.all([
		// 	this.fetchData("/tvnet", this.state.tvnetRssHash, "tvnetRss", "tvnetRssHash", "latvijaskoronakartesTvnetRss", "latvijaskoronakartesTvnetRssHash", "whenTvnetRssHaveBeenLastUpdated", "hasSeenNewInfectedPeople", true),
		// 	this.fetchData("/facts", this.state.factsHash, "facts", "factsHash", "latvijaskoronakartesFacts", "latvijaskoronakartesFactsHash", "whenFactsHaveBeenLastUpdated", "hasSeenNewTvnetRss", true),
		// 	this.fetchData("/infected", this.state.infectedPeopleHash, "infectedPeople", "infectedPeopleHash", "latvijaskoronakartesInfectedPeople", "latvijaskoronakartesInfectedPeopleHash", "whenInfectedPeopleHaveBeenLastUpdated", "hasSeenNewFacts", true)
		// ])
		// 	.then(([...functionExecutions]) => {
		// 		this.setState({
		// 			...functionExecutions
		// 		})
		// 	})
		// 	.catch(err => {
		// 		this.setState({ hasError: true, errorMessage: "Corona Error at getting data" })
		// 	})

		// if (this.state.whenInfectedPeopleHaveBeenLastUpdated === "Īslaicīga, problēma ar serveri, patreiz nav zināms" ||
		// 	this.state.whenTvnetRssHaveBeenLastUpdated === "Īslaicīga, problēma ar serveri, patreiz nav zināms" ||
		// 	this.state.whenFactsHaveBeenLastUpdated === "Īslaicīga, problēma ar serveri, patreiz nav zināms") {
		// } {

		this.fetchData("/infected",
			this.state.infectedPeopleHash,
			"infectedPeople",
			"infectedPeopleHash",
			"latvijaskoronakartesInfectedPeople",
			"latvijaskoronakartesInfectedPeopleHash",
			"whenInfectedPeopleHaveBeenLastUpdated",
			"hasSeenNewFacts",
			false)

		this.fetchData("/tvnet",
			this.state.tvnetRssHash,
			"tvnetRss",
			"tvnetRssHash",
			"latvijaskoronakartesTvnetRss",
			"latvijaskoronakartesTvnetRssHash",
			"whenTvnetRssHaveBeenLastUpdated",
			"hasSeenNewInfectedPeople",
			false)

		this.fetchData("/facts",
			this.state.factsHash,
			"facts",
			"factsHash",
			"latvijaskoronakartesFacts",
			"latvijaskoronakartesFactsHash",
			"whenFactsHaveBeenLastUpdated",
			"hasSeenNewTvnetRss",
			false)


		// }

		// console.log(this.props)
		// setInterval(() => {
		// 	this.props.history.push('/')
		// }, 1000);
		if (this.state.userSettings === {} || Object.keys(this.state.userSettings).length < 5) {
			const { activeFirstFactIndex, activeSecondFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap } = this.state
			localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify({ activeFirstFactIndex, activeSecondFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap }))

		}
		if (this.state.infectedPeopleHash === undefined || this.state.infectedPeopleHash.length < 1) {
			localStorage.setItem("latvijaskoronakartesInfectedPeopleHash", "")
		}

		if (this.state.tvnetRssHash === undefined || this.state.tvnetRssHash.length < 1) {
			localStorage.setItem("latvijaskoronakartesTvnetRssHash", "")
		}

		if (this.state.factsHash === undefined || this.state.factsHash.length < 1) {
			localStorage.setItem("latvijaskoronakartesFactsHash", "")
		}
	}


	fetchData = (
		slug,
		hash,
		thisStateProperyName,
		thisStatePropertyHashName,
		localStorageItemName,
		localStorageItemHashName,
		whenThisStateProperyNameHasBeenLastUpdated,
		hasSeenThisStatePropertyName,
		shouldReturnPromise
	) => {

		axios({
			method: 'post',
			url: process.env.REACT_APP_API_HOST + slug,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": jwt.sign({ secret: process.env.REACT_APP_JWT_SECRET }, process.env.REACT_APP_JWT_KEY),
			},
			params: {
				hash: hash
			}
		})
			.then((result) => result.data)
			.then(
				(result) => {

					if (result.data === "nothingNew") {

						if (shouldReturnPromise) {
							return this.setState({
								[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
								[hasSeenThisStatePropertyName]: true
							})
						} else {
							this.setState({
								[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
								[hasSeenThisStatePropertyName]: true
							})
						}

					} else {

						localStorage.setItem(localStorageItemName, JSON.stringify(result.data))
						localStorage.setItem(localStorageItemHashName, result.hash)
						if (shouldReturnPromise) {
							return this.setState({
								[thisStateProperyName]: result.data,
								[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
								[hasSeenThisStatePropertyName]: false
							})
						} else {
							this.setState({
								[thisStateProperyName]: result.data,
								[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
								[hasSeenThisStatePropertyName]: false
							})
						}

					}


				},
				(error) => {
					console.log(`ERROR AT ${slug} request`, error)
					if (!shouldReturnPromise) {
						return this.setState({ hasError: true, errorMessage: error })
					} else {
						this.setState({ hasError: true, errorMessage: error })
					}
				}
			)

	}

	handleInfectedClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeInfectedIndex } = this.state
		const newIndex = activeInfectedIndex === index ? -1 : index

		// this.setState({ activeInfectedIndex: newIndex, openedInfoWindowId: titleProps.id })
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

	handleFirstFactClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeFirstFactIndex } = this.state
		const newIndex = activeFirstFactIndex === index ? -1 : 0

		this.setState({ activeFirstFactIndex: newIndex })
		const newLocalStorageSettings = JSON.parse(localStorage.getItem("latvijaskoronakartesSettings"))
		newLocalStorageSettings.activeFirstFactIndex = newIndex
		localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify(newLocalStorageSettings))
	}

	handleSecondFactClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeSecondFactIndex } = this.state
		const newIndex = activeSecondFactIndex === index ? -1 : 0

		this.setState({ activeSecondFactIndex: newIndex })
		const newLocalStorageSettings = JSON.parse(localStorage.getItem("latvijaskoronakartesSettings"))
		newLocalStorageSettings.activeSecondFactIndex = newIndex
		localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify(newLocalStorageSettings))
	}

	handleFirstTvnetClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeFirstTvnetIndex } = this.state
		const newIndex = activeFirstTvnetIndex === index ? -1 : index

		this.setState({ activeFirstTvnetIndex: newIndex })
	}

	handleMapAccordionClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeMapAccordionIndex } = this.state
		const newIndex = activeMapAccordionIndex === index ? -1 : 0
		const newLocalStorageSettings = JSON.parse(localStorage.getItem("latvijaskoronakartesSettings"))
		newLocalStorageSettings.activeMapAccordionIndex = newIndex

		this.setState({ activeMapAccordionIndex: newIndex })
		localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify(newLocalStorageSettings))
	}

	handlePolylineToggle = (e) => {
		const { polylinesVisible } = this.state
		const arePolylinesVisibleNow = polylinesVisible === true ? false : true
		const newLocalStorageSettings = JSON.parse(localStorage.getItem("latvijaskoronakartesSettings"))
		newLocalStorageSettings.polylinesVisible = arePolylinesVisibleNow

		this.setState({ polylinesVisible: arePolylinesVisibleNow })
		localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify(newLocalStorageSettings))
	}

	handleMapTypeToggle = (e) => {
		const { currentlyVisibleMap } = this.state
		const newlyVisibleMap = currentlyVisibleMap === "googleMap" ? "skpcMap" : "googleMap"
		const newLocalStorageSettings = JSON.parse(localStorage.getItem("latvijaskoronakartesSettings"))
		newLocalStorageSettings.currentlyVisibleMap = newlyVisibleMap

		this.setState({ currentlyVisibleMap: newlyVisibleMap })
		localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify(newLocalStorageSettings))
	}


	render() {
		const {
			activeInfectedIndex,
			activeTvnetIndex,
			activeFactIndex,
			infectedPeople,
			tvnetRss,
			facts,
			activeFirstFactIndex,
			activeSecondFactIndex,
			activeMapAccordionIndex,
			polylinesVisible,
			currentlyVisibleMap,
			hasError,
			hasSeenNewInfectedPeople,
			hasSeenNewTvnetRss,
			hasSeenNewFacts,
			whenInfectedPeopleHaveBeenLastUpdated,
			whenTvnetRssHaveBeenLastUpdated,
			whenFactsHaveBeenLastUpdated,
			// errorMessage
			// openedInfoWindowId
		} = this.state

		return (
			<Segment inverted={true}>


				{/* ####################### */}
				{/* THIS IS AN ERROR WINDOW */}
				{/* ####################### */}
				{hasError && <Modal open={this.state.hasError} basic size="small">
					<Header icon="american sign language interpreting" content="Atvainojos Par Traucējumu" />
					<Modal.Content>
						<p>
							Ir notikusi neparedzēta kļūda mājaslapas kodā. Lapa funkcionēs tikai daļē. Programmētāju armāda strādā pie labojumiem un kļūda tiks izlabota tuvāko minūšu laikā.
      					</p>
					</Modal.Content>
					<Modal.Actions>
						<Button color="green" inverted onClick={() => { this.setState({ hasError: false }) }}>
							<Icon name="checkmark" /> Viss Ok
     					</Button>
					</Modal.Actions>
				</Modal>}















				<Grid divided stackable >
					<Grid.Row>

						{/* ########################## */}
						{/* THIS IS THE TWITTER WINDOW */}
						{/* ########################## */}
						<Grid.Column stackable="true" width={3} divided="true"  >


							<Header className="box-header" inverted={true} as="h4">SPKC Twittera Tvīti</Header>
							<TwitterTimelineEmbed
								placeholder={"loading"}
								noHeader
								noFooter
								transparent
								noScrollbar
								autoHeight={true}
								theme={'dark'}
								sourceType="profile"
								screenName="SPKCentrs"
								options={{ height: "200px!important" }}
							/>











							{/* ############################ */}
							{/* THIS IS THE TVNET RSS WINDOW */}
							{/* ############################ */}
							<Header className="box-header" inverted={true} as="h4">TvNet Korona Ziņas{!hasSeenNewTvnetRss && whenTvnetRssHaveBeenLastUpdated !== null && whenTvnetRssHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms" && <Label color='green' horizontal>Ir Jaunumi</Label>}</Header>

							<div style={{ overflow: "auto", maxHeight: 35 + "vh" }}>
								{tvnetRss && tvnetRss.map((el, i) => {


									return <Accordion key={Math.random() * i + 0} inverted={true} styled>
										<Accordion.Title className={"accordion-title"} inverted="true" active={activeTvnetIndex === i ? true : false} index={i} onClick={this.handleTvnetClick}>
											<Icon corner name="dropdown" />
											{el.title}{" "}
											{moment(el.pubDate).fromNow()}

										</Accordion.Title>

										<Accordion.Content href={el.link} style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeTvnetIndex === i ? true : false}>
											{el.enclosure && el.enclosure.url && <img alt="Bilde Nestradā" href={el.link || "#"} className="ui small left floated image" src={el.enclosure ? el.enclosure.url : el.enclosure} ></img>}
											<p>{el.content}</p>

										</Accordion.Content>

									</Accordion>


								})}
							</div>

						</Grid.Column>

















						{/* ###################### */}
						{/* THIS IS THE MAP WINDOW */}
						{/* ###################### */}
						<Grid.Column stackable="true" width={10} className={"map-container"} >


							<Header className="box-header main-header" as="h3" inverted={true} textAlign={"center"} >Paliec Mājās, Sargi Ģimeni</Header>

							<Segment raised style={{ padding: "0" }}>
								{currentlyVisibleMap === "googleMap" && polylinesVisible && infectedPeople && <MainMapWithPolylines infectedPeople={infectedPeople} lastUpdate={whenInfectedPeopleHaveBeenLastUpdated} />}
								{currentlyVisibleMap === "googleMap" && !polylinesVisible && infectedPeople && <MainMapWithoutPolylines infectedPeople={infectedPeople} lastUpdate={whenInfectedPeopleHaveBeenLastUpdated} />}
								{currentlyVisibleMap === "skpcMap" ? <SKPCMap /> : ""}
								{/* {this.state.polylinesVisible && infectedPeople && <MainMapWithPolylines infectedPeople={infectedPeople} openedInfoWindowId={openedInfoWindowId}/> }
								{!this.state.polylinesVisible && infectedPeople && <MainMapWithoutPolylines infectedPeople={infectedPeople} openedInfoWindowId={openedInfoWindowId}/>} */}
							</Segment>


							<Button disabled={currentlyVisibleMap === "googleMap" ? false : true} className={"top-button"} compact size={"small"} inverted={true} floated={"right"} toggle onClick={this.handlePolylineToggle}>

								{polylinesVisible ? "Izslēgt" : "Ieslēgt"} Izplatības Ceļu
							</Button>

							<Button className={"top-button"} compact size={"small"} inverted={true} floated={"right"} toggle onClick={this.handleMapTypeToggle}>
								Parādīt {currentlyVisibleMap === "googleMap" ? "SKPC Reģionu Karti" : "Izplatības Karti"}
							</Button>



						</Grid.Column>











						<Grid.Column width={3} divided="true" >

							{/* ############################## */}
							{/* THIS IS THE KNOWN CASES WINDOW */}
							{/* ############################## */}
							<Header className="box-header" as="h4" inverted={true}>Atklātie Gadījumi{!hasSeenNewInfectedPeople && whenInfectedPeopleHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms" && <Label color='green' horizontal>Ir Jaunumi</Label>}</Header>


							<div style={{ overflow: "auto", maxHeight: 20 + "vh" }}>
								{infectedPeople && infectedPeople.map((el, i) => {
									return (
										<Accordion key={Math.random() * i + 0} inverted={true} styled>


											<Accordion.Title className={el.isDead === "1" ? "accordion-title-dead" : el.isRecovered === "1" ? "accordion-title-recovered" : "accordion-title-infected"} id={el.id} inverted="true" active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
												<Icon corner name="dropdown" />
												{el.id !== "1"
													?
													"#" + el.id + ", " + (el.dateOfDiagnosisBroadcast ? el.dateOfDiagnosisBroadcast : "") + ", " + (el.selfCity ? el.selfCity : "") + ""
													:
													el.label
												}

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

								})}
							</div>












							{/* ############################# */}
							{/* THIS IS THE FACTS/INFO WINDOW */}
							{/* ############################# */}
							<Header className="box-header" inverted={true} as="h4">Korona/COVID-19 Fakti{!hasSeenNewFacts && whenFactsHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms" && <Label color='green' horizontal>Ir Jaunumi</Label>}</Header>
							<div style={{ overflow: "auto", maxHeight: 40 + "vh" }}>



								{/* THESE TWO ARE HARD CODED */}
								<Accordion key={0} inverted={true} styled>


									<Accordion.Title className={"accordion-title"} inverted="true" active={activeFirstFactIndex === -1 ? false : true} index={0} onClick={this.handleFirstFactClick}>
										<Icon corner name="dropdown" />
										Intervija Ar Inficēto <u>Vieglā Formā</u>
									</Accordion.Title>

									<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeFirstFactIndex === -1 ? false : true}>
										{this.state.activeFirstFactIndex !== -1 && <Embed
											id="NxvMLnCczXI"
											source="youtube"
											active={true}
											autoplay={false}
										/>}
									</Accordion.Content>



									<Accordion.Title className={"accordion-title"} inverted="true" active={activeSecondFactIndex === -1 ? false : true} index={0} onClick={this.handleSecondFactClick}>
										<Icon corner name="dropdown" />
										Situācija Ķīnā
									</Accordion.Title>

									<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeSecondFactIndex === -1 ? false : true}>
										{this.state.activeSecondFactIndex !== -1 && <Embed
											id="IhzF-5xELOE"
											source="youtube"
											active={true}
											autoplay={false}
										/>}
									</Accordion.Content>


								</Accordion>




								{/* THESE ARE THE FACTS GOTTEN FROM THE API */}
								{facts && facts.map((el, i) => {
									return <Accordion key={Math.random() * i + 2} inverted={true} styled>

										<Accordion.Title className={"accordion-title"} inverted="true" active={activeFactIndex === i} index={i} onClick={this.handleFactClick}>
											<Icon corner name="dropdown" />
											{el.title}
										</Accordion.Title>

										<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeFactIndex === i}>
											{el.content}
											<br></br>
											{el.link1 && <a href={el.link1 || "http://google.com"}>{el.linkTitle1 || "resurss"}</a>}
											<br></br>
											{el.link2 && <a href={el.link2 || "http://google.com"}>{el.linkTitle2 || "resurss"}</a>}
											<br></br>
											{el.link3 && <a href={el.link3 || "http://google.com"}>{el.linkTitle3 || "resurss"}</a>}
										</Accordion.Content>

									</Accordion>
								})}





							</div>
















							{/* ############################ */}
							{/* THIS IS THE ABOUT MAP WINDOW */}
							{/* ############################ */}
							<Header className="box-header" inverted={true} as="h4">Par Karti</Header>
							<div style={{ overflow: "auto", maxHeight: 20 + "vh" }}>
								<Accordion key={0} inverted={true} styled>

									<Accordion.Title className={"accordion-title"} inverted="true" active={activeMapAccordionIndex === -1 ? false : true} index={0} onClick={this.handleMapAccordionClick}>
										<Icon corner name="dropdown" />
									Kā interpretēt kartē attēloto
									</Accordion.Title>

									<Accordion.Content style={{ color: "white", background: "#525252", paddingLeft: "1.5em" }} className={"accordion-content"} active={activeMapAccordionIndex === -1 ? false : true}>
										<li>Ņemiet vērā, ka vairums uz kartes esošajiem punktiem ir aptuvenas informācijas vizualizācija un nenorāda konkrētas adreses. To var noskaidrot uzklikšķinot uz interesējošā punkta</li>
										<li>Visi inficētie kuriem nav zināma atrašanās vieta atrodas Rīgā</li>
										<li>Punkti tiek katru dienu atjaunoti, lai attēlotu pēdējo SPKC attēlojumu pa reģioniem</li>
										<li>Ja nav publicēta konkrētāka apstiprinātās personas atrašanās vieta, tad inficētais gadījums tiks novietots SPKC publicētās kartes reģiona lielākajā apdzīvotajā teritorijā</li>
										<li>Piemēram: ja Rīgā ir norādīts, ka konkrētā dienā ir no 51-100 inficētajiem un Jelgavas reģionā 1-5, tad Rīgā tiek ielikts 51 punkts un Jelgavā tiks ielikts 1 punkts</li>
										<li>Sarkanā krāsā ir iezīmētas apdzīvotas vietas un ceļi</li>
										<li>Ieslēdzot inficēšanās ceļu var redzēt kā vīruss ir izplatījies, bet ņemiet vērā, ka, ja inficēšanās vieta nav publicēta, mēs pieņemam, ka inficēšanās ir notikusi ārzemēs, bet, ja konkrētā inficēšanās valsts ārzemēs arī nav publicēta, mēs norādam, ka inficēšanās ir izplatījusies no Rīgas</li>
										<li>Ja nav publicēta inficētā atrašanās vieta mēs pieņemam, ka viņš atrodas Rīgā</li>
										<li>Ja nav publicēts inficēšanās vieta un atrašanas vieta, bet ir publicēts, ka inficēšanās ir notikusi ārzemēs gadījumam nav inficēšanas ceļa</li>
										<li>Ja ir publicēta inficēšanās vieta ārzemēs, tie gadījumi ir norādīti Rīgā, pārdaugavas pusē. Sākotnēji tādi gadījumi tika norādīti lidostā, bet kopš SKPC ir publicējusi konkrētu skaitu ar inficētajiem Mārupē, lai dati sakrisu, jaunā atrašnās vieta tādiem gadījumiem ir pārdaugava Rīgā.</li>
										<li>Ja ir vēl jautājumi par to, kā interpretēt karti, jautājiet sūtot jautājumu uz ēpastu</li>

									</Accordion.Content>

								</Accordion>
							</div>


						</Grid.Column>

					</Grid.Row>


				</Grid>

				<p>Karti uztur: https://github.com/snotrman/corona-map, nils.riga@gmail.com</p>

			</Segment >
		);
	}
}

export default Home;
