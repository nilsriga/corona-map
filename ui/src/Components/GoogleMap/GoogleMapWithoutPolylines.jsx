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
import moment from "moment"
import biohazardIcon from "./bioHazzardIcon.png"
import "moment/locale/lv"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
moment.locale('lv')


let state = {
  markerIcon: {},
  labelOrigin: {},
  i: 0,
  total: 0,
  timeNow: moment().format('DD.MMM.YYYY'),
}


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
    componentWillMount() {

    },
    componentDidMount() {

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
      gridSize={11}
      ignoreHidden={true}
    >



      {
        props.infectedPeople.map((item, index, arr) => {


          // THIS MAKES MARKERS BE SPREAD OUT A MORE
          const selfLat = parseFloat(getOffsetCoo(item.selfCooLat))
          const selfLng = parseFloat(getOffsetCoo(item.selfCooLng))



          state.markerIcon = {
            url: biohazardIcon,
            origin: new window.google.maps.Point(0, 0),
            labelOrigin: new window.google.maps.Point(getOffsetXY(35), getOffsetXY(65))
          }

          return (
            <div key={Math.random() * 10000000000000000}>



              <MarkerWithInfoWindow
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



            </div>
          )


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
            <h2>LV Kopā: {props.infectedPeople.length}</h2>
            <p>{state.timeNow}</p>
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
        icon={state.markerIcon}
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
