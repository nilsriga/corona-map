import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Icon,
	Button,
	Embed,
	Modal
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

	userSettings = localStorage.getItem("latvijaskoronakartesSettings") ? JSON.parse(localStorage.getItem("latvijaskoronakartesSettings")) : {}

	storedInfectedPeople = localStorage.getItem("latvijaskoronakartesInfectedPeople") ? JSON.parse(localStorage.getItem("latvijaskoronakartesInfectedPeople")) : []
	storedTvnetRss = localStorage.getItem("latvijaskoronakartesTvnetRss") ? JSON.parse(localStorage.getItem("latvijaskoronakartesTvnetRss")) : []
	storedFacts = localStorage.getItem("latvijaskoronakartesFacts") ? JSON.parse(localStorage.getItem("latvijaskoronakartesFacts")) : []

	storedInfectedPeopleHash = localStorage.getItem("latvijaskoronakartesInfectedPeopleHash") ? localStorage.getItem("latvijaskoronakartesInfectedPeopleHash") : ""
	storedTvnetRssHash = localStorage.getItem("latvijaskoronakartesTvnetRssHash") ? localStorage.getItem("latvijaskoronakartesTvnetRssHash") : ""
	storedFactsHash = localStorage.getItem("latvijaskoronakartesFactsHash") ? localStorage.getItem("latvijaskoronakartesFactsHash") : ""

	state = {
		userSettings: this.userSettings,

		activeInfectedIndex: -1,
		activeTvnetIndex: -1,
		activeFactIndex: -1,
		activeFirstTvnetIndex: 0,
		activeFirstFactIndex: this.userSettings !== {} && this.userSettings.activeFirstFactIndex ? this.userSettings.activeFirstFactIndex : -1,
		activeSecondFactIndex: this.userSettings !== {} && this.userSettings.activeSecondFactIndex ? this.userSettings.activeSecondFactIndex : 0,
		activeMapAccordionIndex: this.userSettings !== {} && this.userSettings.activeMapAccordionIndex ? this.userSettings.activeMapAccordionIndex : 0,

		polylinesVisible: this.userSettings !== {} && this.userSettings.polylinesVisible ? this.userSettings.polylinesVisible : false,
		currentlyVisibleMap: this.userSettings !== {} && this.userSettings.currentlyVisibleMap ? this.userSettings.currentlyVisibleMap : "googleMap",

		infectedPeople: this.storedInfectedPeople !== [] ? this.storedInfectedPeople : [],
		tvnetRss: this.storedTvnetRss !== [] ? this.storedTvnetRss : [],
		facts: this.storedFacts !== [] ? this.storedFacts : [],

		infectedPeopleHash: this.storedInfectedPeopleHash ? this.storedInfectedPeopleHash : "",
		tvnetRssHash: this.storedTvnetRssHash ? this.storedTvnetRssHash : "",
		factsHash: this.storedFactsHash ? this.storedFactsHash : "",

		hasError: false,
		errorMessage: "",

		// openedInfoWindowId: {}
	}


	componentWillMount() {

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


	componentDidMount() {

		this.fetchData("/tvnet", this.state.tvnetRssHash, "tvnetRss", "tvnetRssHash", "latvijaskoronakartesTvnetRss", "latvijaskoronakartesTvnetRssHash")
		this.fetchData("/facts", this.state.factsHash, "facts", "factsHash", "latvijaskoronakartesFacts", "latvijaskoronakartesFactsHash")
		this.fetchData("/infected", this.state.infectedPeopleHash, "infectedPeople", "infectedPeopleHash", "latvijaskoronakartesInfectedPeople", "latvijaskoronakartesInfectedPeopleHash")

	}


	fetchData = (slug, hash, thisStateProperyName, thisStatePropertyHashName, localStorageItemName, localStorageItemHashName) => {

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


					if (result !== "nothingNew") {

						localStorage.setItem(localStorageItemName, JSON.stringify(result.data))
						localStorage.setItem(localStorageItemHashName, result.hash)
						this.setState({ [thisStateProperyName]: result.data }) // This is the cause. If I turn off the state update, the browser crash never happens. It somehow makes everything rerender or something. 

					}


				},
				(error) => {
					console.log(`ERROR AT ${slug} request`, error)
					this.setState({ hasError: true, errorMessage: error })
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
							<Header className="box-header" inverted={true} as="h4">TvNet Korona Ziņas</Header>

							<div style={{ overflow: "auto", maxHeight: 35 + "vh" }}>
								{tvnetRss.map((el, i) => {


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
								{currentlyVisibleMap === "googleMap" && polylinesVisible && infectedPeople && <MainMapWithPolylines infectedPeople={infectedPeople} />}
								{currentlyVisibleMap === "googleMap" && !polylinesVisible && infectedPeople && <MainMapWithoutPolylines infectedPeople={infectedPeople} />}
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
							<Header className="box-header" as="h4" inverted={true}>Atklātie Gadījumi</Header>


							<div style={{ overflow: "auto", maxHeight: 20 + "vh" }}>
								{
									infectedPeople.map((el, i) => {
										return (
											<Accordion key={Math.random() * i + 0} inverted={true} styled>


												<Accordion.Title className={"accordion-title"} id={el.id} inverted="true" active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
													<Icon corner name="dropdown" />
													{el.id !== 1
														?
														"#" + el.id + ", " + (el.dateOfDiagnosisBroadcast ? el.dateOfDiagnosisBroadcast : "") + ", " + (el.origin ? el.origin : "")
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

									})
								}
							</div>












							{/* ############################# */}
							{/* THIS IS THE FACTS/INFO WINDOW */}
							{/* ############################# */}
							<Header className="box-header" inverted={true} as="h4">Korona/COVID-19 Fakti</Header>
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
								{facts.map((el, i) => {
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
