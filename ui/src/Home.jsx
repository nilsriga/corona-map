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
				<Container>
					<Grid divided stackable>
						<Grid.Row>
							<Grid.Column stretched>

								<Header as="h4">TVNET + SPKC Twitter</Header>
								<List>


									<List.Item>

										<Accordion inverted>
											<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
												<Icon name='dropdown' />
												What is a dog?
											</Accordion.Title>
											<Accordion.Content active={activeIndex === 0}>
												<p>
													A dog is a type of domesticated animal. Known for its loyalty and
													faithfulness, it can be found as a welcome guest in many
													households across the world.
												</p>
											</Accordion.Content>

											<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
												<Icon name='dropdown' />
												What kinds of dogs are there?
											</Accordion.Title>
											<Accordion.Content active={activeIndex === 1}>
												<p>
													There are many breeds of dogs. Each breed varies in size and
													temperament. Owners often select a breed of dog that they find to
													be compatible with their own lifestyle and desires from a
													companion.
												</p>
											</Accordion.Content>


										</Accordion>


										Mushy
									</List.Item>


									<List.Item as="a" target="_blank" href="http://finchecker.eu/contact-us">
										Sushy
									</List.Item>


								</List>


							</Grid.Column>

							<Grid.Column width={14}>

								<Segment style={{ padding: "1px" }}>
									<MainMap />
								</Segment>

							</Grid.Column>

							<Grid.Column divided stretched>

								<Grid.Row>Info Par Inficiētajiem</Grid.Row>

								<Divider></Divider>

								<Grid.Row>WHO FACTS</Grid.Row>

							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Segment>
		);
	}
}

export default Home;
