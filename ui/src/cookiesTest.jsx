import React, { Component, } from "react";
import {
	Grid,
	Header,
	Segment,
	Accordion,
	Icon,
	Button,
	Embed,
	// Checkbox
	// Comment,
	// Divider
} from "semantic-ui-react"
import CookieConsent from "react-cookie-consent";
import MainMapWithPolylines from "./Components/GoogleMap/GoogleMapWithPolylines"
import MainMapWithoutPolylines from "./Components/GoogleMap/GoogleMapWithoutPolylines"
import SKPCMap from "./Components/SKPCMap/SKPCMap"
import Twitter from './Components/Twitter'
import moment from "moment"
import jwt from "jsonwebtoken"
import "./Home.css"
import "moment/locale/lv"
moment.locale('lv')

// import TvnetRss from "./Components/TvnetRss"


class Home extends Component {


	state = {
		userSettings: {},
		activeMapAccordionIndex:  1,
		activeFirstFactIndex:  1,
		currentlyVisibleMap: "googleMap",
		polylinesVisible:  false,
		userConsent: {},
		activeFirstTvnetIndex: 1,
		activeInfectedIndex: -1,
		activeTvnetIndex: -1,
		activeFactIndex: -1,
		infectedPeople: [],
		tvnetRss: [],
		facts: [],
		auth: {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': jwt.sign({ secret: process.env.REACT_APP_JWT_SECRET, randomness: Math.random() * 100000 }, process.env.REACT_APP_JWT_KEY)
			}
		},
		// openedInfoWindowId: {}
	}

	componentWillMount() {

		
	}
	
	componentDidMount() {
		this.setState({
	
			userSettings: localStorage.getItem("latvijaskoronakartesIestatijumi") ? JSON.parse(localStorage.getItem("latvijaskoronakartesIestatijumi")) : this.state.userSettings,
			activeMapAccordionIndex: this.userSettings && this.userSettings !== {} && this.userSettings.activeMapAccordionIndex ? this.userSettings.activeMapAccordionIndex : this.state.activeMapAccordionIndex,
			activeFirstFactIndex: this.userSettings && this.userSettings !== {} && this.userSettings.activeFirstFactIndex ? this.userSettings.activeFirstFactIndex : this.state.activeMapAccordionIndex,
			currentlyVisibleMap: this.userSettings && this.userSettings !== {} && this.userSettings.currentlyVisibleMap ? this.userSettings.currentlyVisibleMap : this.state.currentlyVisibleMap,
			polylinesVisible: this.userSettings && this.userSettings !== {} && this.userSettings.polylinesVisible !== undefined ? this.userSettings.polylinesVisible : this.state.polylinesVisible,
			userConsent: this.userSettings && this.userSettings !== {} && this.userSettings.userConsent !== undefined ? this.userSettings.userConsent : this.state.userConsent,
	
		})


		fetch(process.env.REACT_APP_API_HOST + "/facts", this.state.auth)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ facts: result })
				},
				(error) => {
					console.log("ERROR AT /fact, request", error)
					this.setState({ facts: error })
				}
			)


		fetch(process.env.REACT_APP_API_HOST + "/tvnet", this.state.auth)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ tvnetRss: result })
				},
				(error) => {
					console.log("ERROR AT /tvnet, request", error)
					this.setState({ tvnetRss: error })
				}
			)

		fetch(process.env.REACT_APP_API_HOST + "/infected", this.state.auth)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ infectedPeople: result.reverse() })
				},
				(error) => {
					console.log("ERROR AT / request", error)
					this.setState({ infectedPeople: error })
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
		const { activeFirstFactIndex, userSettings } = this.state
		const newIndex = activeFirstFactIndex === index ? -1 : index
		this.setState({ activeFirstFactIndex: newIndex })
		
		if (userSettings && this.state.userConsent) {
			const newCookieSettings = userSettings
			newCookieSettings.activeFirstFactIndex = newIndex
			localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify(newCookieSettings))
		}
	}

	handleFirstTvnetClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeFirstTvnetIndex } = this.state
		const newIndex = activeFirstTvnetIndex === index ? -1 : index

		this.setState({ activeFirstTvnetIndex: newIndex })
	}

	handleMapAccordionClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeMapAccordionIndex, userSettings } = this.state
		const newIndex = activeMapAccordionIndex === index ? -1 : index
		this.setState({ activeMapAccordionIndex: newIndex })
		
		if(userSettings && this.state.userConsent) {
			const newCookieSettings = userSettings
			newCookieSettings.activeMapAccordionIndex = newIndex
			localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify(newCookieSettings))
		}
	}

	handlePolylineToggle = (e) => {
		const { polylinesVisible, userSettings } = this.state
		const arePolylinesVisibleNow = polylinesVisible === true ? false : true
		this.setState({ polylinesVisible: arePolylinesVisibleNow })
		
		if(userSettings && this.state.userConsent) {
			const newCookieSettings = userSettings
			newCookieSettings.polylinesVisible = arePolylinesVisibleNow
			localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify(newCookieSettings))
		}
	}

	handleMapTypeToggle = (e) => {
		const { currentlyVisibleMap, userSettings } = this.state
		const newlyVisibleMap = currentlyVisibleMap === "googleMap" ? "skpcMap" : "googleMap"
		this.setState({ currentlyVisibleMap: newlyVisibleMap }, () => {

			if (userSettings && this.state.userConsent) {
				const newCookieSettings = userSettings
				newCookieSettings.currentlyVisibleMap = newlyVisibleMap
				localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify(newCookieSettings))
			}
		})
		

	}

	handleAcceptedConsent = (e) => {
		this.setState({ userConsent: true }, () => {

			this.createUserSettingsCookie()
		})
	}

	handleDeclinedConsent = (e) => {
		this.setState({ userConsent: false })
		const { newCookieSettings } = this.state.userSettings
		
		if (newCookieSettings) {
			newCookieSettings.userConsent = false
			localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify(newCookieSettings))

		}
	}

	createUserSettingsCookie = (e) => {
		console.log(this.state.userConsent)
		if ( this.state.userConsent === true && Object.keys(this.state.userSettings).length < 5) {
			const { activeFirstFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap, userConsent } = this.state
			localStorage.setItem("latvijaskoronakartesIestatijumi", JSON.stringify({ activeFirstFactIndex, activeMapAccordionIndex, polylinesVisible, currentlyVisibleMap, userConsent }))
		}
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
			activeMapAccordionIndex,
			polylinesVisible,
			currentlyVisibleMap,
			userConsent
			// openedInfoWindowId
		} = this.state

		return (
			<Segment inverted={true}>
				<Grid divided stackable >
					<Grid.Row>

						{this.state.userConsent !== true && this.state.userConsent !== false && <CookieConsent
							enableDeclineButton
							location="bottom"
							buttonText="Es Atļauju"
							declineButtonText="Es Neatļauju"
							buttonStyle={{ color: "#2f3133", fontSize: "13px" }}
							declineButtonStyle={{ color: "#2f3133", fontSize: "13px" }}
							style={{ background: "#1b1c1d", maxHeight: "90px", margin: "0px!important" }}
							onAccept={this.handleAcceptedConsent}
							onDecline={this.handleDeclinedConsent}
						>
							Ļoti atvainojos par traucējumu. Gribēju prasīt atļauju saglabāt jūsu iestatījumus un lapas datus jūsu ierīcē, lai nākamreiz lapa ielādējas ātrāk.
						</CookieConsent>}

						<Grid.Column stackable="true" width={3} divided="true"  >



							<Header className="box-header" inverted={true} as="h4">SPKC Twittera Tvīti</Header>
							<Twitter />



							<Header className="box-header" inverted={true} as="h4">TvNet Korona Ziņas</Header>

							<div style={{ overflow: 'auto', maxHeight: 35 + "vh" }}>
								{tvnetRss.map((el, i) => {


									return <Accordion key={Math.random() * i + 0} inverted={true} styled>
										<Accordion.Title className={"accordion-title"} inverted="true" active={activeTvnetIndex === i} index={i} onClick={this.handleTvnetClick}>
											<Icon corner name='dropdown' />
											{el.title}{" "}
											{moment(el.pubDate).fromNow()}

										</Accordion.Title>

										<Accordion.Content href={el.link} style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeTvnetIndex === i}>
											{el.enclosure && el.enclosure.url && <img alt="Bilde Nestradā" href={el.link || "#"} className="ui small left floated image" src={el.enclosure ? el.enclosure.url : el.enclosure} ></img>}
											<p>{el.content}</p>

										</Accordion.Content>

									</Accordion>


								})}
							</div>

						</Grid.Column>

						<Grid.Column stackable="true" width={10} className={"map-container"} >


							<Button disabled={currentlyVisibleMap === "googleMap" ? false : true} className={"top-button"} compact size={"small"} inverted={true} floated={"right"} toggle onClick={this.handlePolylineToggle}>

								{polylinesVisible ? "Izslēgt" : "Ieslēgt"} Izplatības Ceļu
							</Button>

							<Button className={"top-button"} compact size={"small"} inverted={true} floated={"right"} toggle onClick={this.handleMapTypeToggle}>
								Parādīt {currentlyVisibleMap === "googleMap" ? "SKPC Reģionu Karti" : "Izplatības Karti"}
							</Button>

							<Header className="box-header main-header" as="h3" inverted={true} textAlign={"center"} >Paliec Mājās, Sargi Ģimeni</Header>

							<Segment raised style={{ padding: "0" }}>
								{currentlyVisibleMap === "googleMap" && polylinesVisible && infectedPeople && <MainMapWithPolylines infectedPeople={infectedPeople} />}
								{currentlyVisibleMap === "googleMap" && !polylinesVisible && infectedPeople && <MainMapWithoutPolylines infectedPeople={infectedPeople} />}
								{currentlyVisibleMap === "skpcMap" ? <SKPCMap /> : ""}
								{/* {this.state.polylinesVisible && infectedPeople && <MainMapWithPolylines infectedPeople={infectedPeople} openedInfoWindowId={openedInfoWindowId}/> }
								{!this.state.polylinesVisible && infectedPeople && <MainMapWithoutPolylines infectedPeople={infectedPeople} openedInfoWindowId={openedInfoWindowId}/>} */}
							</Segment>

						</Grid.Column>




						<Grid.Column width={3} divided="true" >


							<Header className="box-header" as="h4" inverted={true}>Atklātie Gadījumi</Header>



							<div style={{ overflow: 'auto', maxHeight: 20 + "vh" }}>
								{
									infectedPeople.map((el, i) => {
										return (
											<Accordion key={Math.random() * i + 0} inverted={true} styled>


												<Accordion.Title className={"accordion-title"} id={el.id} inverted="true" active={activeInfectedIndex === i} index={i} onClick={this.handleInfectedClick}>
													<Icon corner name='dropdown' />
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



							<Header className="box-header" inverted={true} as="h4">Korona/COVID-19 Fakti</Header>
							<div style={{ overflow: 'auto', maxHeight: 40 + "vh" }}>

								<Accordion key={0} inverted={true} styled>

									<Accordion.Title className={"accordion-title"} inverted="true" active={activeFirstFactIndex === -1 ? false : true} index={0} onClick={this.handleFirstFactClick}>
										<Icon corner name='dropdown' />
										Intervija Ar Inficēto <u>Vieglā Formā</u>
									</Accordion.Title>

									<Accordion.Content style={{ color: "white", background: "#525252" }} className={"accordion-content"} active={activeFirstFactIndex === -1 ? false : true}>
										<Embed
											id='NxvMLnCczXI'
											source='youtube'
											active={true}
										/>
									</Accordion.Content>

								</Accordion>


								{facts.map((el, i) => {
									return <Accordion key={Math.random() * i + 2} inverted={true} styled>

										<Accordion.Title className={"accordion-title"} inverted="true" active={activeFactIndex === i} index={i} onClick={this.handleFactClick}>
											<Icon corner name='dropdown' />
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



							<Header className="box-header" inverted={true} as="h4">Par Karti</Header>
							<div style={{ overflow: 'auto', maxHeight: 20 + "vh" }}>
								<Accordion key={0} inverted={true} styled>

									<Accordion.Title className={"accordion-title"} inverted="true" active={activeMapAccordionIndex === -1 ? false : true} index={0} onClick={this.handleMapAccordionClick}>
										<Icon corner name='dropdown' />
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

			</Segment>
		);
	}
}

export default Home;
