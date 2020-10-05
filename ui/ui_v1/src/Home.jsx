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
	Loader,
	Dimmer,
	// Image
} from "semantic-ui-react"
import MainMapWithPolylines from "./Components/GoogleMap/GoogleMapWithPolylines"
import MainMapWithoutPolylines from "./Components/GoogleMap/GoogleMapWithoutPolylines"
import SKPCMap from "./Components/SKPCMap/SKPCMap"
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import moment from "moment"
import jwt from "jsonwebtoken"
import axios from "axios"
// import ContaclessImage from "./Components/Banner/contactless.png"
import "./Home.css"
import "moment/locale/lv"
moment.locale("lv")



class Home extends Component {


	state = {
		localStorageCleared10Apr: (JSON.parse(localStorage.getItem("latvijaskoronakartesSettings")) || {}).localStorageCleared10Apr || false,
		localStorageCleared15Apr: (JSON.parse(localStorage.getItem("latvijaskoronakartesSettings")) || {}).localStorageCleared15Apr || false,
		userSettings: JSON.parse(localStorage.getItem("latvijaskoronakartesSettings")) || {},

		storedInfectedPeople: JSON.parse(localStorage.getItem("latvijaskoronakartesInfectedPeople")) || [],
		storedTvnetRss: JSON.parse(localStorage.getItem("latvijaskoronakartesTvnetRss")) || [],
		storedFacts: JSON.parse(localStorage.getItem("latvijaskoronakartesFacts")) || [],

		storedInfectedPeopleHash: localStorage.getItem("latvijaskoronakartesInfectedPeopleHash"),
		storedTvnetRssHash: localStorage.getItem("latvijaskoronakartesTvnetRssHash"),
		storedFactsHash: localStorage.getItem("latvijaskoronakartesFactsHash"),

		storedInfectedPeopleMetadata: JSON.parse(localStorage.getItem("latvijaskoronakartesInfectedPeopleMetadata")) || {},

		infectedPeopleMetadata: {},
		tvnetRssMetadata: {},
		factsMetadata: {},

		activeInfectedIndex: -1,
		activeTvnetIndex: -1,
		activeFactIndex: -1,
		activeFirstTvnetIndex: 0,
		activeFirstFactIndex: -1,
		activeSecondFactIndex: 0,
		activeMapAccordionIndex: 0,

		polylinesVisible: false,
		currentlyVisibleMap: "googleMap",

		twitterLoaded: false,
		tvnetLoaded: false,
		infectedLoaded: false,
		factsLoaded: false,
		mapLoaded: false,
		aboutMapLoaded: false,

		infectedPeople: [],
		tvnetRss: [],
		facts: [],

		unseenInfectedPeopleCount: 0,
		unseenTvnetRssCount: 0,
		unseenFactsCount: 0,

		infectedPeopleHash: "",
		tvnetRssHash: "",
		factsHash: "",

		stateInitializationComplete: false,

		hasSeenNewInfectedPeople: false,
		hasSeenNewTvnetRss: false,
		hasSeenNewFacts: false,

		whenInfectedPeopleHaveBeenLastUpdated: "",
		whenTvnetRssHaveBeenLastUpdated: "",
		whenFactsHaveBeenLastUpdated: "",

		hasError: false,
		errorMessage: "",

		firstVisit: true,

		// openedInfoWindowId: {}
	}


	componentWillMount() {



	}


	componentDidMount() {
		Promise.all([
			this.fetchData("/tvnet",
				this.state.storedTvnetRssHash,
				"tvnetRss",
				"tvnetRssHash",
				"latvijaskoronakartesTvnetRss",
				"latvijaskoronakartesTvnetRssHash",
				"latvijaskoronakartesTvnetRssMetadata",
				"whenTvnetRssHaveBeenLastUpdated",
				"hasSeenNewTvnetRss",
				"tvnetLoaded"),

			this.fetchData("/infected",
				this.state.storedInfectedPeopleHash,
				"infectedPeople",
				"infectedPeopleHash",
				"latvijaskoronakartesInfectedPeople",
				"latvijaskoronakartesInfectedPeopleHash",
				"latvijaskoronakartesInfectedPeopleMetadata",
				"whenInfectedPeopleHaveBeenLastUpdated",
				"hasSeenNewInfectedPeople",
				"infectedLoaded"),

			this.fetchData("/facts",
				this.state.storedFactsHash,
				"facts",
				"factsHash",
				"latvijaskoronakartesFacts",
				"latvijaskoronakartesFactsHash",
				"latvijaskoronakartesFactsMetadata",
				"whenFactsHaveBeenLastUpdated",
				"hasSeenNewFacts",
				"factsLoaded")
		])
			.then(([...objectsAndKeysToUpdate]) => {
				const stateInitialization = {
					localStorageCleared10Apr: true,

					userSettings: this.state.userSettings ? this.state.userSettings : {},

					storedInfectedPeople: this.state.storedInfectedPeople ? this.state.storedInfectedPeople : [],
					storedTvnetRss: this.state.storedTvnetRss ? this.state.storedTvnetRss : [],
					storedFacts: this.state.storedFacts ? this.state.storedFacts : [],

					storedInfectedPeopleMetadata: this.state.storedInfectedPeopleMetadata ? this.state.storedInfectedPeopleMetadata : {},

					infectedPeopleMetadata: this.state.storedInfectedPeopleMetadata !== {} ? this.state.storedInfectedPeopleMetadata : {},

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

					whenInfectedPeopleHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",
					whenTvnetRssHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",
					whenFactsHaveBeenLastUpdated: "Īslaicīga, problēma ar serveri, patreiz nav zināms",

					aboutMapLoaded: true,

					stateInitializationComplete: true,

					firstVisit: typeof (this.state.storedInfectedPeopleHash || this.state.storedTvnetRssHash || this.state.storedFactsHash) === "string" ? false : true
				}
				const ajaxInitializationObjects = [...objectsAndKeysToUpdate]
				ajaxInitializationObjects.forEach(el => {
					Object.assign(stateInitialization, el)
				})
				this.setState(stateInitialization)
			})
			.catch(err => {
				this.setState({ hasError: true, errorMessage: "Corona Error at getting data" + err })
			})


		if (this.state.userSettings === {} || Object.keys(this.state.userSettings).length < 6) {

			if (this.state.localStorageCleared15Apr === false) {
				localStorage.clear()
			}
			const { activeFirstFactIndex, activeSecondFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap } = this.state
			localStorage.setItem("latvijaskoronakartesSettings", JSON.stringify({ activeFirstFactIndex, activeSecondFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap, localStorageCleared15Apr: true }))

		}



	}

	componentDidUpdate() {
	}


	fetchData = (
		slug,
		hash,
		thisStateProperyName,
		thisStatePropertyHashName,
		localStorageItemName,
		localStorageItemHashName,
		localStorageItemMetadataName,
		whenThisStateProperyNameHasBeenLastUpdated,
		hasSeenThisStatePropertyName,
		thisStateLoadedProperyName
	) => {


		return axios({
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
						return {
							[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
							[hasSeenThisStatePropertyName]: true,
							[thisStateLoadedProperyName]: true,
						}

					} else {

						localStorage.setItem(localStorageItemName, JSON.stringify(result.data))
						localStorage.setItem(localStorageItemHashName, result.hash)
						localStorage.setItem(localStorageItemMetadataName, JSON.stringify(result.metadata))
						return {
							[thisStateProperyName]: result.data,
							[whenThisStateProperyNameHasBeenLastUpdated]: result.lastUpdateTime,
							[hasSeenThisStatePropertyName]: false,
							[thisStateLoadedProperyName]: true,
							[thisStateProperyName + "Metadata"]: result.metadata
						}

					}


				},
				(error) => {
					console.log(`ERROR AT ${slug} request`, error)
					return { hasError: true, errorMessage: error }
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

	handleTwitterLoading = (e) => {
		this.setState({ twitterLoaded: true })
	}

	handleOpenSkpcDashboard = (e) => {
		window.open("https://spkc.maps.arcgis.com/apps/opsdashboard/index.html#/4469c1fb01ed43cea6f20743ee7d5939", '_blank');
		// this.props.history.push('/link/to/route/in/current/tab');
	}

	render() {
		const {
			activeInfectedIndex,
			activeTvnetIndex,
			activeFactIndex,
			infectedPeople,
			tvnetRss,
			facts,
			storedInfectedPeople,
			storedTvnetRss,
			storedFacts,
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
			twitterLoaded,
			infectedLoaded,
			tvnetLoaded,
			factsLoaded,
			stateInitializationComplete,
			unseenInfectedPeopleCount,
			unseenFactsCount,
			unseenTvnetRssCount,
			firstVisit,
			infectedPeopleMetadata,
			// storedInfectedPeople
			// aboutMapLoaded
			// errorMessage
			// openedInfoWindowId
		} = this.state

		function countUnseenElements(elHash, unseenVariableNameCount, storedVariableNameHash) {
			if (storedVariableNameHash
				&& storedVariableNameHash.length > 1
				&& storedVariableNameHash
				&& elHash !== storedVariableNameHash
			) {
				window[unseenVariableNameCount] = window[unseenVariableNameCount] + 1
				return <Label color='green' horizontal>Jauns</Label>
			}
		}


		return (
			<Segment inverted={true}>

				<Header className="box-header main-header" as="h3" inverted={true} textAlign={"center"} >Paliec Mājās, Sargi Ģimeni  </Header>


				{/* ####################### */}
				{/* THIS IS AN ERROR WINDOW */}
				{/* ####################### */}
				{hasError && <Modal open={hasError} basic size="small">
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


							<Dimmer.Dimmable className={!twitterLoaded ? "ui-box twitter-container" : "ui-box"} dimmed={!twitterLoaded} >

								<Header className="box-header" inverted={true} as="h4">SPKC Twittera Tvīti</Header>

								<Dimmer active={!twitterLoaded}  >
									<Loader></Loader>
								</Dimmer>


								{stateInitializationComplete ? <TwitterTimelineEmbed
									noHeader
									noFooter
									transparent
									noScrollbar
									autoHeight={true}
									theme={'dark'}
									sourceType="profile"
									screenName="SPKCentrs"
									onLoad={this.handleTwitterLoading}
								/> : ""}


							</Dimmer.Dimmable>











							{/* ############################ */}
							{/* THIS IS THE TVNET RSS WINDOW */}
							{/* ############################ */}

							<Dimmer.Dimmable className={"ui-box"} dimmed={!tvnetLoaded} style={{ height: "40vh" }} >
								<Dimmer active={!tvnetLoaded} >
									<Loader></Loader>
								</Dimmer>
								<Header className="box-header" inverted={true} as="h4">
									TvNet Korona Ziņas
									{
										stateInitializationComplete
										&& !firstVisit
										&& !hasSeenNewTvnetRss
										&& whenTvnetRssHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms"
										&& <Label color='green' horizontal>{unseenTvnetRssCount === 0 ? "Jaunumi" : unseenTvnetRssCount}</Label>
									}
								</Header>

								<div style={{ overflow: "auto", maxHeight: "40vh" }}>
									{
										tvnetRss ? tvnetRss.map((el, i) => {

											return <Accordion key={Math.random() * i + 0} inverted={true} styled>
												<Accordion.Title className={"accordion-title"} inverted="true" active={activeTvnetIndex === i ? true : false} index={i} onClick={this.handleTvnetClick}>
													<Icon corner name="dropdown" />
													{
														!firstVisit && countUnseenElements(el ? el.hash : "", "unseenTvnetRssCount", storedTvnetRss[i] ? storedTvnetRss[i].hash : "")
													}
													{el.title}{" "}
													{moment(el.pubDate).fromNow()}
												</Accordion.Title>

												<Accordion.Content href={el.link} style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeTvnetIndex === i ? true : false}>
													{el.enclosure && el.enclosure.url && <img alt="Bilde Nestradā" href={el.link || "#"} className="ui small left floated image" src={el.enclosure ? el.enclosure.url : el.enclosure} ></img>}
													<p>{el.content}</p>

												</Accordion.Content>

											</Accordion>


										})
											:
											""
									}
								</div>

							</Dimmer.Dimmable>


						</Grid.Column>

















						{/* ###################### */}
						{/* THIS IS THE MAP WINDOW */}
						{/* ###################### */}
						<Grid.Column stackable="true" width={10} className={"map-container"} >



							<Button disabled={currentlyVisibleMap === "googleMap" ? false : true} className={"top-button"} compact size={"small"} inverted={true} toggle onClick={this.handlePolylineToggle}>
								{polylinesVisible ? "Izslēgt" : "Ieslēgt"} Izplatības Ceļu
							</Button>

							<Button className={"top-button"} compact size={"small"} inverted={true} toggle onClick={this.handleMapTypeToggle}>
								Parādīt {currentlyVisibleMap === "googleMap" ? "SKPC Reģionu Karti" : "Izplatības Karti"}
							</Button>

							<Button className={"top-button"} compact size={"small"} inverted={true} toggle onClick={this.handleOpenSkpcDashboard}>
								Atvērt SKPC Paneli
							</Button>


							<Segment raised style={{ padding: "0" }} >

								{currentlyVisibleMap === "googleMap" &&
									!polylinesVisible &&
									infectedPeople &&
									stateInitializationComplete ?
									<MainMapWithoutPolylines infectedPeopleData={{ infectedPeople: infectedPeople, lastUpdate: whenInfectedPeopleHaveBeenLastUpdated, metadata: infectedPeopleMetadata }} /> : ""}
								{currentlyVisibleMap === "googleMap" &&
									polylinesVisible &&
									infectedPeople &&
									stateInitializationComplete ?
									<MainMapWithPolylines infectedPeopleData={{ infectedPeople: infectedPeople, lastUpdate: whenInfectedPeopleHaveBeenLastUpdated, metadata: infectedPeopleMetadata }} /> : ""}
								{currentlyVisibleMap === "skpcMap" ? <SKPCMap className={"skpc-map"} /> : ""}

							</Segment>


						</Grid.Column>










						<Grid.Column width={3} divided="true" >

							{/* ############################## */}
							{/* THIS IS THE KNOWN CASES WINDOW */}
							{/* ############################## */}
							<Dimmer.Dimmable className={!infectedLoaded ? "ui-box infected-container" : "ui-box"} dimmed={!infectedLoaded} style={{ height: "24vh" }}>
								<Dimmer active={!infectedLoaded} >
									<Loader></Loader>
								</Dimmer>
								<Header className="box-header" as="h4" inverted={true}>
									Atklātie Gadījumi
									{
										stateInitializationComplete
										&& !firstVisit
										&& !hasSeenNewInfectedPeople
										&& whenInfectedPeopleHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms"
										&& <Label color='green' horizontal>{unseenInfectedPeopleCount === 0 ? "Jaunumi" : unseenInfectedPeopleCount}</Label>
									}
								</Header>

								<div style={{ overflow: "auto", maxHeight: "20vh" }}>


									<Accordion inverted={true} styled>
										<Accordion.Title className={"accordion-title-infected"} key={Math.random() * 10000}>
											Šodien Kopā: {infectedPeopleMetadata.howManyInfectedToday}
											<br />
											{
												stateInitializationComplete
													&& infectedPeopleMetadata
													&& infectedPeopleMetadata !== null
													&& infectedPeopleMetadata !== undefined
													&& infectedPeopleMetadata.whereTodayInfected !== null
													&& infectedPeopleMetadata.whereTodayInfected !== undefined
													? Object.keys(infectedPeopleMetadata.whereTodayInfected).map((keyName, i, arr) => (

														<li className="travelcompany-input" key={i}>
															<span className="input-label">{arr[i]}: {infectedPeopleMetadata.whereTodayInfected[keyName]}</span>
														</li>

													))
													:
													""
											}
										</Accordion.Title>
										{
											infectedPeople ? infectedPeople.map((el, i) => {


												return (
													<div key={Math.random() * 10000}>
														<Accordion.Title className={el.isDead === "1" ? "accordion-title-dead" : el.isRecovered === "1" ? "accordion-title-recovered" : "accordion-title-infected"} id={el.id} inverted="true" active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
															<Icon corner name="dropdown" />
															{
																!firstVisit && el && el.hash && countUnseenElements(el.hash, "unseenInfectedPeopleCount", storedInfectedPeople[i] ? storedInfectedPeople[i].hash : "")
															}
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
													</div>

												)

											})
												:
												""
										}
									</Accordion>
								</div>
							</Dimmer.Dimmable>












							{/* ############################# */}
							{/* THIS IS THE FACTS/INFO WINDOW */}
							{/* ############################# */}

							<Dimmer.Dimmable className={"ui-box"} dimmed={!factsLoaded} style={{ height: "45vh", display: "block!important" }} >
								<Dimmer active={!factsLoaded} >
									<Loader></Loader>
								</Dimmer>
								<Header className="box-header" inverted={true} as="h4">
									Korona/COVID-19 Fakti
									{
										stateInitializationComplete
										&& !firstVisit
										&& !hasSeenNewFacts
										&& whenFactsHaveBeenLastUpdated !== "Īslaicīga, problēma ar serveri, patreiz nav zināms"
										&& <Label color='green' horizontal>{unseenFactsCount === 0 ? "Jaunumi" : unseenFactsCount}</Label>
									}
								</Header>

								<div style={{ overflow: "auto", maxHeight: "40vh" }}>



									{/* THESE TWO ARE HARD CODED */}
									<Accordion key={0} inverted={true} styled>


										<Accordion.Title className={"accordion-title"} inverted="true" active={activeFirstFactIndex === -1 ? false : true} index={0} onClick={this.handleFirstFactClick}>
											<Icon corner name="dropdown" />
										Saslimšanas ilgtermiņa sekas
										</Accordion.Title>

										<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeFirstFactIndex === -1 ? false : true}>
											{
												activeFirstFactIndex !== -1
												&& <Embed
													id="NQ0FaaJ73xc"
													source="youtube"
													active={true}
													autoplay={false}
												/>
											}
										</Accordion.Content>



										<Accordion.Title className={"accordion-title"} inverted="true" active={activeSecondFactIndex === -1 ? false : true} index={0} onClick={this.handleSecondFactClick}>
											<Icon corner name="dropdown" />
										Vīrusa Izplatība Gaisā
									</Accordion.Title>

										<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeSecondFactIndex === -1 ? false : true}>
											{
												activeSecondFactIndex !== -1
												&& <Embed
													id="WZSKoNGTR6Q"
													source="youtube"
													active={true}
													autoplay={false}
												/>
											}
										</Accordion.Content>


									</Accordion>




									{/* THESE ARE THE FACTS GOTTEN FROM THE API */}
									{facts ? facts.map((el, i) => {
										return <Accordion key={Math.random() * i + 2} inverted={true} styled>

											<Accordion.Title className={"accordion-title"} inverted="true" active={activeFactIndex === i} index={i} onClick={this.handleFactClick}>
												<Icon corner name="dropdown" />
												{
													!firstVisit && el && el.hash && countUnseenElements(el.hash, "unseenFactsCount", storedFacts[i] ? storedFacts[i].hash : "")
												}
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
									})
										:
										""}





								</div>

							</Dimmer.Dimmable>













							{/* ############################ */}
							{/* THIS IS THE ABOUT MAP WINDOW */}
							{/* ############################ */}
							<div className={"ui-box"}>
								<Dimmer.Dimmable className={"ui-box"} dimmed={!factsLoaded} style={{ height: "25vh", display: "block!important" }} >
									<Dimmer active={!factsLoaded} >
										<Loader></Loader>
									</Dimmer>
									<Header className="box-header" inverted={true} as="h4">Par Karti</Header>
									<div style={{ overflow: "auto", maxHeight: "20vh" }}>
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
								</Dimmer.Dimmable>
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
