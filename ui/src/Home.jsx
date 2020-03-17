import React, { Component, } from "react";
import {
	Grid,
	Container,
	List,
	Header,
	Divider,
	Segment,
	Accordion,
	Icon
} from "semantic-ui-react";
import MainMap from "./Components/GoogleMap";
import Twitter from './Components/Twitter';
// import TvnetRss from "./Components/Tvnet"

class Home extends Component {


	state = { 
		activeInfectedIndex: -1,
		activeFactIndex: -1
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
			activeInfectedIndex
		 } = this.state
		return (
			<Segment inverted>
				<Grid divided stackable>
					<Grid.Row>



						<Grid.Column width={3} divided streached >

							<Segment compact inverted>

								<Header as="h4">SPKC Twitter</Header>
								<Twitter />

							</Segment>

						</Grid.Column>




						<Grid.Column width={10} >

							<Segment raised style={{ padding: "0" }}>
								<MainMap />
							</Segment>

						</Grid.Column>




						<Grid.Column width={3} divided stretched >

							<Grid.Row color={"gray"}>

								<Header as="h4" inverted>Inficētie</Header>


								<Segment style={{ padding: "0" }} >


									<Accordion styled>


										<Accordion.Title active={activeInfectedIndex === 0} index={0} onClick={this.handleInfectedClick}>
											<Icon name='dropdown' />
										#60 Inficētais
         							 </Accordion.Title>
										<Accordion.Content active={activeInfectedIndex === 0}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeInfectedIndex === 1} index={1} onClick={this.handleInfectedClick}>
											<Icon name='dropdown' />
										#59 Inficētais
        						    </Accordion.Title>
										<Accordion.Content active={activeInfectedIndex === 1}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeInfectedIndex === 2} index={2} onClick={this.handleInfectedClick}>
											<Icon name='dropdown' />
										#58 Inficētais
         							</Accordion.Title>
										<Accordion.Content active={activeInfectedIndex === 2}>
											Info:...
									</Accordion.Content>


									</Accordion>
								</Segment>



							</Grid.Row>

							<Divider></Divider>

							<Grid.Row>

								<Header as="h4" inverted>COVID-19 Fakti</Header>

								<Segment style={{ padding: "0" }} >



									<Accordion styled>


										<Accordion.Title active={activeFactIndex === 0} index={0} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#60 Inficētais
         							 </Accordion.Title>
										<Accordion.Content active={activeFactIndex === 0}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeFactIndex === 1} index={1} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#59 Inficētais
        						    </Accordion.Title>
										<Accordion.Content active={activeFactIndex === 1}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeFactIndex === 2} index={2} onClick={this.handleFactClick}>
											<Icon name='dropdown' />
										#58 Inficētais
         							</Accordion.Title>
										<Accordion.Content active={activeFactIndex === 2}>
											Info:...
									</Accordion.Content>


									</Accordion>
								</Segment>


							</Grid.Row>

						</Grid.Column>



					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Home;
