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

class Home extends Component {


	state = { activeIndex: -1 }

	handleClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index

		this.setState({ activeIndex: newIndex })
	}



	render() {
		const { activeIndex } = this.state
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


										<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#60 Inficētais
         							 </Accordion.Title>
										<Accordion.Content active={activeIndex === 0}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#59 Inficētais
        						    </Accordion.Title>
										<Accordion.Content active={activeIndex === 1}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#58 Inficētais
         							</Accordion.Title>
										<Accordion.Content active={activeIndex === 2}>
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


										<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#60 Inficētais
         							 </Accordion.Title>
										<Accordion.Content active={activeIndex === 0}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#59 Inficētais
        						    </Accordion.Title>
										<Accordion.Content active={activeIndex === 1}>
											Info:...
									</Accordion.Content>



										<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
											<Icon name='dropdown' />
										#58 Inficētais
         							</Accordion.Title>
										<Accordion.Content active={activeIndex === 2}>
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
