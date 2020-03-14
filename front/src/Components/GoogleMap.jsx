import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api'


const mapStyles = {
  width: '100%',
  height: '100%',
};


class MainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}],
      google: {}
    }
  }
  render() {
    return (
      <div>
        {/* <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
        > */}
        {/* <Map
          defaultZoom={12}
          defaultCenter={{
            lat: 56.955533,
            lng: 24.090859
          }}
        >
        </Map> */}

          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          />
        {/* </LoadScript> */}
      </div>
    )
  }
}

// export default GoogleApiWrapper(
//   (props) => ({
//     apiKey: process.env.REACT_APP_MAPS_API_KEY,
//     language: props.language,
//   }
// ))(MainMap)
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MainMap);


// export default MainMap;