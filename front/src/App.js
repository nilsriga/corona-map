import React from 'react';
import MainMap from './Components/GoogleMap.jsx'
import "./App.css"
// import Request from './Components/Request.jsx'

function App() {
  return (
    <div className="App">

      <div>
        {/* <Request> */}
          <MainMap></MainMap>
        {/* </Request> */}
      </div>

    </div>
  );
}

export default App;
