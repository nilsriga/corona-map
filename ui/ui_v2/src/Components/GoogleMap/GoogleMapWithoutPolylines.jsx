import React from "react";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps"
import MyStyle from "./MyStyleJSON.js"
import biohHazzardIcon from "./bioHazzardIcon.png"
import skullIcon from "./skullIcon.png"
import checkIcon from "./checkIcon.png"
// import { componentDidUpdate } from "react-google-maps/lib/utils/MapChildHelper";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

// THIS SPREADS OUT THE POINTS A BIT
function getOffsetCoo(coo) {

  let i = (Math.random() * 0.001).toFixed(5)
  let num = coo
  for (let y = 0; y < 10; y++) {
    let sign = Math.random()
    if (sign === 0) {
      num = (num + i).toFixed(5)
    } else {
      num = (num - i).toFixed(5)
    }
  }

  return num
}

function getOffsetXY(num) {
  let i = (Math.random() * 12)
  for (let y = 0; y < 10; y++) {
    let sign = Math.random()
    if (sign === 0) {
      num = (num + i)
    } else {
      num = (num - i)
    }
  }

  return num
}




const MapWithoutPolylines = compose(

  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "90vh" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  lifecycle({
    combonentWillMount() {
    },
    componentDidUpdate() {

    },
    shouldComponentUpdate() {
      return false
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
      lat: 56.955533,
      lng: 24.090859
    }}
    defaultOptions={MyStyle}
  >

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={2}
      ignoreHidden={true}
    >



      {
        props.infectedPeopleData.infectedPeople.map((item, index, arr) => {

          if (item.isRecovered === "0") {


            // THIS MAKES MARKERS BE SPREAD OUT A MORE
            const selfLat = parseFloat(getOffsetCoo(item.selfCooLat))
            const selfLng = parseFloat(getOffsetCoo(item.selfCooLng))

            const icon = item.isDead === "1" ? skullIcon : item.isRecovered === "1" ? checkIcon : biohHazzardIcon
            const markerIcon = {
              url: icon,
              origin: new window.google.maps.Point(0, 0),
              labelOrigin: new window.google.maps.Point(getOffsetXY(35), getOffsetXY(65))
            }

            return (



              <MarkerWithInfoWindow
                key={Math.random() * 10000000000000000}
                markerIcon={markerIcon}
                position={
                  item.id === "1"
                    ?
                    {
                      lat: parseFloat(item.selfCooLat),
                      lng: parseFloat(item.selfCooLng)
                    }
                    :
                    {
                      lat: selfLat,
                      lng: selfLng
                    }
                }
                content={(
                  <div style={{ opacity: 0.75 }}>
                    <div>
                      <ul>

                        {item.label ? <h3>{item.label}</h3> : ""}
                        {item.origin ? <li>Izcelsme: {item.origin}</li> : ""}
                        {item.totalInfected ? <li>Inficētais Nr.: {item.totalInfected}</li> : ""}
                        {item.dateOfFirstContactWIthLatvia ? <li>Pirmais Kontakts ar Latviju: {item.dateOfFirstContactWIthLatvia}</li> : ""}
                        {item.dateOfDiagnosisBroadcast ? <li>Izsludināšanas Datums: {item.dateOfDiagnosisBroadcast}</li> : ""}
                        {item.descriptionTitle ? <li>Īsumā: {item.descriptionTitle}</li> : ""}
                        {item.descriptionHeader ? <li>{item.descriptionHeader}</li> : ""}
                        {item.link ? <li><a href={item.link}>{item.link}</a></li> : ""}
                        {item.extraLink1 ? <li><a href={item.extraLink1}>{item.extraLink1}</a></li> : ""}
                        {item.extraLink2 ? <li><a href={item.extraLink2}>{item.extraLink1}</a></li> : ""}
                        {item.extraLink3 ? <li><a href={item.extraLink3}>{item.extraLink1}</a></li> : ""}

                      </ul>
                    </div>
                  </div>
                )}
                label={item.id === "1" ? item.label : ""}
              // openedInfoWindowId={{ windowId: props.openedInfoWindowId, selfId: item.id }}
              />



            )

          }


          return ""

        })
      }



      {
        <InfoWindow
          position={{
            lat: 57.235968,
            lng: 23.779556
          }}
          visible={true}
        >
          <div style={{ opacity: 0.75 }}>
            {props.infectedPeopleData.metadata.howManyInfectedToday === 0
              ?
              <div>
                <h2>Inficēti patreiz: {props.infectedPeopleData.metadata.activeCasesCount}</h2>
                <h3>šodien atklāti: {props.infectedPeopleData.metadata.howManyInfectedToday}</h3>
                <br/>
              </div>
              :
              <div>
                <h2>šodien atklāti: {props.infectedPeopleData.metadata.howManyInfectedToday}</h2>
                <h3>Inficēti patreiz: {props.infectedPeopleData.metadata.activeCasesCount}</h3>
              </div>
            }
            <div>
              <p>latvijaskoronakarte.lv</p>
              <p>atjaunoja datus:</p>
              <p>{"\n" + (props.infectedPeopleData.lastUpdate === "Īslaicīga, problēma ar serveri, patreiz nav zināms" ? props.infectedPeopleData.lastUpdate : props.infectedPeopleData.lastUpdate)}</p>
              <p>{props.infectedPeopleData.metadata.howManyInfectedToday === 0 ? "" : "Kur šodien atklāti:"}</p>
            </div>
            {
              props.infectedPeopleData.metadata
                && props.infectedPeopleData.metadata !== null
                && props.infectedPeopleData.metadata !== undefined
                && props.infectedPeopleData.metadata.whereTodayInfected !== null
                && props.infectedPeopleData.metadata.whereTodayInfected !== undefined
                ?
                Object.keys(props.infectedPeopleData.metadata.whereTodayInfected).map((keyName, i, arr) => (

                  <li className="travelcompany-input" key={i}>
                    <span className="input-label">{arr[i]}: {props.infectedPeopleData.metadata.whereTodayInfected[keyName]}</span>
                  </li>

                ))
                :
                ""
            }
          </div>
        </InfoWindow>
      }


    </MarkerClusterer>


  </GoogleMap>


));



class MarkerWithInfoWindow extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);

  }

  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <Marker
        key={Math.random() * 1000 + "Coordinates"}
        position={this.props.position}
        onClick={this.onToggleOpen}
        icon={this.props.markerIcon}
        label={this.props.label}
      >

        {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>

          {this.props.content}

        </InfoWindow>}

        {/* {this.props.openedInfoWindowId.windowId === this.props.openedInfoWindowId.selfId && <InfoWindow onCloseClick={this.onToggleOpen}>

          {this.props.content}

        </InfoWindow>} */}

      </Marker>

    )
  }
}



export default MapWithoutPolylines
