import React, { useEffect } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  MarkerClusterer
  // DirectionsRenderer
} from "react-google-maps";
import MyStyle from "./MyStyleJSON.js"


let state = {
  data: [],
  lineSymbol: {},
  markerIcon: {},
  labelOrigin: {},
  i: 0
}

// THIS SPREADS OUT THE POINTS A BIT
// function getOffsetCoo(coo) {

//   let i = (Math.random() * 0.001).toFixed(5)
//   let num = coo
//   for (let y = 0; y < 10; y++) {
//     let sign = Math.random()
//     if (sign === 0) {
//       num = (num + i).toFixed(5)
//     } else {
//       num = (num - i).toFixed(5)
//     }
//   }

//   return num
// }

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




const MainMap = compose(

  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.setState({ data: [] });
    },
    componentDidMount() {
      // THIS ENABLES DIRECTIONS
      // const DirectionsService = new window.google.maps.DirectionsService();
      let linePath = window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      // linePath.strokeOpacity = 1.0
      // linePath.scale = 4



      state.labelOrigin = new window.google.maps.Point(9, 9)

      state.lineSymbol = {
        path: linePath
      }

      fetch("http://localhost")
        .then(res => res.json())
        .then(
          (result) => {
            state.data = result
          },
          (error) => {
            console.log(error)
            state.data = JSON.parse(error)
          }
        )
        .then(data => this.setState({ data }))
        .then(data => {
          // THIS ENABLES DIRECTIONS
          // state.data.forEach(item => {

          //   const selfLat = parseFloat(item.selfCooLat)
          //   const selfLng = parseFloat(item.selfCooLng)
          //   const originLat = parseFloat(item.originCooLat)
          //   const originLng = parseFloat(item.originCooLng)


          //   DirectionsService.route({
          //     origin: {
          //       lat: originLat,
          //       lng: originLng
          //     },
          //     destination: {
          //       lat: selfLat,
          //       lng: selfLng
          //     },
          //     travelMode: window.google.maps.TravelMode.WALKING,
          //   }, (result, status) => {
          //     if (status === window.google.maps.DirectionsStatus.OK) {
          //       this.setState({
          //         directions: result,
          //       });
          //     } else {
          //       console.error(`error fetching directions ${result}`);
          //     }
          //   });
          // })

        })


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
      gridSize={60}
    >

      {/* {THIS ENABLES DIRECTIONS} */}
      {/* {props.directions && <DirectionsRenderer directions={props.directions} />} */}

      {
        state.data.map((item, index, arr) => {


          const selfLat = parseFloat(item.selfCooLat)
          const selfLng = parseFloat(item.selfCooLng)
          const originLat = parseFloat(item.originCooLat)
          const originLng = parseFloat(item.originCooLng)


          // THIS MAKES MARKERS BE SPREAD OUT A MORE


          // const selfLat = parseFloat(getOffsetCoo(item.selfCooLat))
          // const selfLng = parseFloat(getOffsetCoo(item.selfCooLng))
          // const originLat = parseFloat(getOffsetCoo(item.originCooLat))
          // const originLng = parseFloat(getOffsetCoo(item.originCooLng))

          // return (state.data.map((item, index, arr) => {


          state.markerIcon = {
            url: 'https://iconsplace.com/wp-content/uploads/_icons/fffff0/256/png/biohazard-icon-7-256.png',
            scaledSize: new window.google.maps.Size(25, 25),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(getOffsetXY(30), getOffsetXY(60)),
            labelOrigin: new window.google.maps.Point(getOffsetXY(35), getOffsetXY(65))
          }

          return (
            <div key={Math.random() * 10000000000000000}>
              < Marker
                key={index + "origin"}
                position={{
                  lat: originLat,
                  lng: originLng
                }}
                visible={false}
              // icon={state.markerIcon}
              // label={{
              //   text: item.label,
              //   color: "#fff7f8",
              //   fontSize: "16px",
              //   labelOrigin: state.labelOrigin
              // }}
              />

              < Marker
                key={index + "Coordinates"}
                position={{
                  lat: selfLat,
                  lng: selfLng
                }}
                icon={state.markerIcon}
                onClick={() => { console.log(123) }}
              // label={{
              //   text: item.label,
              //   color: "#fff7f8",
              //   fontSize: "16px",
              //   labelOrigin: state.labelOrigin
              // }}
              />

              < Polyline
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
                  strokeOpacity: 0.3,
                  strokeWeight: 2.2,
                  icons: [{
                    icon: state.lineSymbol,
                    // offset: '100%',
                    scale: 200,
                    repeat: '20px'

                  }],


                }}
              />
            </div>
          )
          // })
          // )
        })
      }



      {/* <Marker
      position={{
        lat: 56.955332,
        lng: 24.090854
      }} />
    <Marker
      position={{
        lat: 56.955437,
        lng: 24.090854
      }} />
    <Marker
      position={{
        lat: 56.955532,
        lng: 24.090851
      }} />
    <Marker
      position={{
        lat: 56.955231,
        lng: 24.090855
      }} /> */}



    </MarkerClusterer>


  </GoogleMap>


));


// export default enhance(MainMap)
export default MainMap
