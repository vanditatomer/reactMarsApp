import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import {NewColonist, ListColonists} from './colonist';
import {NewEncounter, ListEncounters} from './encounter';

const Home = () => (
    <div>
        <h2>Welcome to Mars Colony!</h2>
    </div>
)

class App extends Component {
    render() {
        return (
            <Router>
                <div id="grad" className="App">
                    <div className="appContainer">

                        <ul className="main-menu">
                            <li class="mainFont"><Link to="/">Home</Link></li>
                        </ul>

                        <div className="dropdown mainFont">
                            <button className="dropdown-button">Colonists</button>
                            <div className="dropdown-content">
                                <ul>
                                    <li><Link to="/newcolonist">Register New</Link></li>
                                    <li><Link to="/listcolonists">List All</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="dropdown mainFont">
                            <button className="dropdown-button">Encounters</button>
                            <div className="dropdown-content">
                                <ul>
                                    <li><Link to="/newencounter">Report New</Link></li>
                                    <li><Link to="/listencounters">List Recent</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <Route exact path="/" component={Home}/>
                    <Route path="/newcolonist" component={NewColonist}/>
                    <Route path="/listcolonists" component={ListColonists}/>
                    <Route path="/newencounter" component={NewEncounter}/>
                    <Route path="/listencounters" component={ListEncounters}/>
                </div>
            </Router>
        );
    }
}

export default App;