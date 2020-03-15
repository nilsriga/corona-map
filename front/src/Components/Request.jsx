// fetch("http://localhost")
// .then(res => res.json())
// .then(
//   (result) => {
//     resolve(state.data = JSON.parse(result))
//   },
//   (error) => {
//     console.log(error)
//     state.data = JSON.parse(error)
//   }
// )

// import _ from "lodash";
// import React from "react";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";
// import GitHubForkRibbon from "react-github-fork-ribbon";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4zI6Fi8Va-xhyyWgArrHfFIunAsXFVE8&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     <Marker position={{ lat: -34.397, lng: 150.644 }} />
//   </GoogleMap>
// ));

// const enhance = _.identity;



// export default enhance(MyMapComponent);
