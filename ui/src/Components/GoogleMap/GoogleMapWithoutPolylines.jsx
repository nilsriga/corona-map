import React from "react";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  // Polyline,
  // Circle
  // DirectionsRenderer
} from "react-google-maps"
import MyStyle from "./MyStyleJSON.js"
import moment from "moment"
import "moment/locale/lv"
// import jwt from "jsonwebtoken"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
moment.locale('lv')


let state = {
  // data: [],
  // lineSymbol: {},
  markerIcon: {},
  labelOrigin: {},
  i: 0,
  total: 0,
  timeNow: moment().format('DD.MMM.YYYY'),
  // auth: {
  //   method: "GET",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': jwt.sign({ secret: process.env.REACT_APP_JWT_SECRET }, process.env.REACT_APP_JWT_KEY)
  //   }
  // }
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
      // this.setState({ data: [] });
    },
    componentDidMount() {
      console.log("map wihtout polilines")
      // THIS ENABLES DIRECTIONS
      // const DirectionsService = new window.google.maps.DirectionsService();
      // linePath.strokeOpacity = 1.0
      // linePath.scale = 4


      // state.labelOrigin = new window.google.maps.Point(12, 66)

      // state.lineSymbol = {
      //   path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      // }

      // fetch(process.env.REACT_APP_API_HOST, state.auth)
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //       state.data = result
      //       state.total = result.length
      //     },
      //     (error) => {
      //       console.log(error)
      //       state.data = error
      //     }
      //   )
      //   .then(data => this.setState({ data }))
      //   .then(data => {
      //     // THIS ENABLES DIRECTIONS
      //     // state.data.forEach(item => {
      //     //   const selfLat = parseFloat(item.selfCooLat)
      //     //   const selfLng = parseFloat(item.selfCooLng)
      //     //   const originLat = parseFloat(item.originCooLat)
      //     //   const originLng = parseFloat(item.originCooLng)
      //     //   DirectionsService.route({
      //     //     origin: {
      //     //       lat: originLat,
      //     //       lng: originLng
      //     //     },
      //     //     destination: {
      //     //       lat: selfLat,
      //     //       lng: selfLng
      //     //     },
      //     //     travelMode: window.google.maps.TravelMode.WALKING,
      //     //   }, (result, status) => {
      //     //     if (status === window.google.maps.DirectionsStatus.OK) {
      //     //       this.setState({
      //     //         directions: result,
      //     //       });
      //     //     } else {
      //     //       console.error(`error fetching directions ${result}`);
      //     //     }
      //     //   });
      //     // })

      //   })


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
    // ENABLE THIS FOR CUSTOM CLUSTER ICON
    // styles={[
    //   {
    //     textColor: '#c2fff1',
    //     height: 100,
    //     url: "https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png",
    //     width: 100,
    //   },
    //   {
    //     textColor: '#c2fff1',
    //     height: 56,
    //     url: "https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png",
    //     width: 56,
    //   },
    //   {
    //     textColor: '#c2fff1',
    //     height: 66,
    //     url: "https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png",
    //     width: 66,
    //   },
    //   {
    //     textColor: '#c2fff1',
    //     height: 78,
    //     url: "https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png",
    //     width: 78,
    //   },
    //   {
    //     textColor: '#c2fff1',
    //     height: 90,
    //     url: "https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png",
    //     width: 90,
    //   }]}
    >



      {/* {THIS ENABLES DIRECTIONS} */}
      {/* {props.directions && <DirectionsRenderer directions={props.directions} />} */}
      {
        props.infectedPeople.map((item, index, arr) => {


          // const selfLat = parseFloat(item.selfCooLat)
          // const selfLng = parseFloat(item.selfCooLng)
          // const originLat = parseFloat(item.originCooLat)
          // const originLng = parseFloat(item.originCooLng)

          // THIS MAKES MARKERS BE SPREAD OUT A MORE
          const selfLat = parseFloat(getOffsetCoo(item.selfCooLat))
          const selfLng = parseFloat(getOffsetCoo(item.selfCooLng))
          // const originLat = parseFloat(getOffsetCoo(item.originCooLat))
          // const originLng = parseFloat(getOffsetCoo(item.originCooLng))



          state.markerIcon = {
            url: 'https://iconsplace.com/wp-content/uploads/_icons/fffff0/32/png/biohazard-icon-7-32.png',
            // scaledSize: new window.google.maps.Size(25, 25),
            origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(getOffsetXY(30), getOffsetXY(60)),
            labelOrigin: new window.google.maps.Point(getOffsetXY(35), getOffsetXY(65))
          }

          return (
            <div key={Math.random() * 10000000000000000}>


              {/* < Marker
                key={index + "origin"}
                position={{
                  lat: originLat,
                  lng: originLng
                }}
                visible={false}
                // ENABLE THIS FOR CUSTOM MARKER ICON
                // icon={state.markerIcon}
                label={{
                  text: item.label,
                  color: "#FFFFFF",
                  fontSize: "16px",
                  labelOrigin: state.labelOrigin
                }}
              /> */}




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


              {/* <Marker
                key={index + "Coordinates"}
                position={{
                  lat: selfLat,
                  lng: selfLng
                }}
                icon={state.markerIcon}
                onClick={props.onToggleOpen}
              >

                {
                props.isOpen && <InfoWindow
                  key={index + "Info"}
                  onCloseClick={props.onToggleOpen}
                >
                  <div style={{ opacity: 0.75 }}>
                    <div>
                      <ul>


                        {item.label ? <h3>{item.label}</h3> : ""}
                        {item.origin ? <li>Izcelsme: {item.origin}</li> : ""}
                        {item.totalInfected ? <li>Inficētais Nr.: {item.totalInfected}</li> : ""}
                        {item.dateOfFirstContactWIthLatvia ? <li>Pirmais Kontakts ar Latviju: {item.dateOfFirstContactWIthLatvia}</li> : ""}
                        {item.dateOfDiagnosisBroadcast ? <li>Izsludināšanas Datums: {item.dateOfDiagnosisBroadcast}</li> : ""}
                        {item.descriptionTitle ? <li>Īsumā: {item.descriptionTitle}</li> : ""}
                        {item.link ? <li>{item.link}</li> : ""}
                        {item.descriptionHeader ? <li>{item.descriptionHeader}</li> : ""}
                        {item.extraLink1 ? <li>{item.extraLink1}</li> : ""}
                        {item.extraLink2 ? <li>{item.extraLink2}</li> : ""}
                        {item.extraLink3 ? <li>{item.extraLink3}</li> : ""}

                      </ul>
                    </div>
                  </div>
                </InfoWindow>
                }

              </Marker> */}


              {/* this enables lines of atecedance */}
              {/* < Polyline
                path={
                  [
                    {
                      lat: originLat,
                      lng: originLng
                    },
                    {
                      lat: selfLat,
                      lng: selfLng
                    }
                  ]
                }
                options={{
                  geodesic: true,
                  strokeColor: '#ffa18c',
                  strokeOpacity: item.isKnown == 1 ? 0.3 : 0,
                  strokeWeight: 2.2,
                  icons: [{
                    icon: state.lineSymbol,
                    scale: 200,
                    repeat: '20px'

                  }],
                }}
              /> */}

              {/* IF YOU CAN FIGURE OUT HOW TO PUT TEXT INSIDE A CIRCLE - THIS WILL LOOK BETTER */}
              {/* <Circle
                center={{
                  lat: 57.235968,
                  lng: 23.779556
                }}
                radius={20000}
                options={{
                  geodesic: true,
                  fillColor: "#5a617e",
                  strokeColor: '#f50530',
                  strokeWeight: 0.2,

                }}
                lable={"asdf"}
                text={"asdf"}
                zIndex={1000000}
                onCloseClick={props.onToggleOpen}
              >
              </Circle> */}

            </div>
          )


        })
      }

      {/* STATIC MARKER WITH RIGA COORDINATES */}
      {/* <Marker
      position={{
        lat: 56.955332,
        lng: 24.090854
      }} /> */}

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
            {/* <p>{(new Date()).getUTCDate() + "." + (new Date()).getUTCMonth() + "." + (new Date()).getFullYear()}</p> */}
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
    console.log(this.props.openedInfoWindowId.windowId, this.props.openedInfoWindowId.selfId)
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
