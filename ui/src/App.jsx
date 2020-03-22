import React from 'react';
import Home from './Home.jsx';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import "./App.css"
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App() {
    return (<div className="App" >

        <div >

            <BrowserRouter >

                <Switch >
                    <Route exact path="*"
                        component={Home}
                    />
                </Switch>
            </BrowserRouter>




        </ div >

    </div >
    );
}

export default App;