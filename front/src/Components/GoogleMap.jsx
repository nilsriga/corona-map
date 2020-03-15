import React, { useEffect } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MyStyle from "./MyStyleJSON.js"
import _ from "lodash"


let i = 0

let state = {
  data: [1, 2, 3, 4, 5]
}

// componentDidMount() {
//   setTimeout(this.myMethod, 1000/60)
// }

const data = async () => {
  return new Promise((resolve, reject) => {
    let data
    fetch("http://localhost")
      .then(res => res.json())
      .then(
        (result) => {
          resolve(state.data = JSON.parse(result))
        },
        (error) => {
          console.log(error)
          state.data = JSON.parse(error)
        }
      )
  })
}

const MainMap = compose(
  lifecycle({
    componentWillMount() {
    },
    componentDidMount() {
      this.setState({ data: [] });
      fetch("http://localhost")
      .then(res => res.json())
      .then(
        (result) => {
          state.data = JSON.parse(result)
        },
        (error) => {
          console.log(error)
          state.data = JSON.parse(error)
        }
      )
    //   fetch("https://api.github.com/users/tomchentw/repos?per_page=100")
    //     .then(r => r.json())
    //     .then(data =>
    //       _.reverse(_.sortBy(_.filter(data, it => !it.fork), "pushed_at"))
    //     )
    //     .then(data => this.setState({ data }));
    }
  
  }),


  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
    withScriptjs,
    withGoogleMap

) (props =>{
return (
console.log(props),
  <GoogleMap defaultZoom={8}
    defaultCenter={{
      lat: 56.955533,
      lng: 24.090859
    }}
    defaultOptions={MyStyle}
  >

    {
      console.log(data()),
      console.log(state.data),
      console.log(state)
    }

    {
      state.data.map(item => (
        i = i + 0.01,
        console.log(item),
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


)

} );


export default MainMap

