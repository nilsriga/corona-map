import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MyStyle from "./MyStyleJSON.js"


let i = 0

let state = {
  data: [1, 2, 3, 4, 5]
}

const data = async () => {
  return new Promise((resolve, reject) => {
    let data
    fetch("http://localhost")
      .then(res => res.json())
      .then(
        (result) => {
          resolve(data = JSON.parse(result))
        },
        (error) => {
          console.log(error)
        }
      )
  })
}

const MainMap = compose(

  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (

  <GoogleMap defaultZoom={8}
    defaultCenter={{
      lat: 56.955533,
      lng: 24.090859
    }}
    defaultOptions={MyStyle}
  >

    {
      console.log(data())
    }

    {
      state.data.map(item => (
        i = i + 0.01,

        <Marker
          key={item + Math.random() * 10000000000000000}
          position={{
            lat: 56.955332 + i,
            lng: 24.090854 - i
          }}
        />

      ))
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





  </GoogleMap>
));


export default MainMap

