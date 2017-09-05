import React, { Component } from 'react';
import axios from 'axios';

class NewEncounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            aliens: [],
            colonist_id: '',
            date: '',
            alien_id: '',
            alien_type: '',
            action: '',
            message: ''
        }
    }

    componentDidMount() {
        this.getAliens();
    }

    getAliens() {

        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
            .then((response) => {
                this.setState({
                    aliens: response.data.aliens,
                    alienType: response.data.aliens[0].type,
                    message: ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.postEncounter();
        event.preventDefault();
    }

    postEncounter() {

        this.setState({
            message: 'Submitting...'
        });

        axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
            "encounter" : {
                "atype" : this.state.alienType,
                "date" : this.state.date,
                "action" : this.state.action,
                "colonist_id" : this.state.colonist_id
            }
        })
        .then((response) => {
            if (response) {
                this.setState({
                    response: response,
                    message: ''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.response.data !== undefined) {

            let encounter = this.state.response.data.encounter;

            return (
                <div className="App">
                    <br />
                    <h4>Your encounter report has been submitted.</h4>
                    <br />
                    <div className="post-response">
                        <div><label>Encounter ID:</label><h5>{encounter.id}</h5></div>
                        <div><label>Date:</label><h5>{encounter.date}</h5></div>
                        <div><label>Colonist ID:</label><h5>{encounter.colonist_id}</h5></div>
                        <div><label>Alien Type:</label><h5>{encounter.atype}</h5></div>
                        <div><label>Action Taken:</label><h5>{encounter.action}</h5></div>
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else if (this.state.aliens.length > 0) {
            let aliens = this.state.aliens;

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br />
                    <h3>New Encounter</h3>
                    <br />
                    <label>Colonist ID:</label>
                    <input
                        name="colonist_id"
                        type="text"
                        value={this.state.colonist_id}
                        required
                        onChange={(event) => this.handleChange(event)} />
                    <br />
                    <label>Date:</label>
                    <input
                        name="date"
                        type="date"
                        value={this.state.date}
                        required
                        onChange={(event)=>this.handleChange(event)} />
                    <br />
                    <label>Alien Type:</label>
                    <select name="alienType" value={this.state.alienType} onChange={(event) => this.handleChange(event)}>
                        {aliens.map(alien => <option key={alien.id} value={alien.type}>{alien.type}</option>)}
                    </select>
                    <br />
                    <label>Action Taken:<br /></label>
                    <textarea
                        name="action"
                        value={this.state.action}
                        required
                        onChange={(event) => this.handleChange(event)} />
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                    <br />
                </form>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

class ListEncounters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            message: ''
        }
    }

    componentDidMount() {
        this.getEncounters();
    }

    getEncounters() {

        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
            .then((response) => {
                this.setState({
                    response: response,
                    message: ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.response.data !== undefined) {
            let encounters = this.state.response.data.encounters;
            let recents = encounters.filter((encounter) => encounter.date >= '2017-01-01' );

            return (
                <div className="App">
                    <div className="appBackground">
                        <br />
                        <h4>Recent Encounters</h4>
                        <br />
                        <div className="appHeading encounter-report-column">
                            <ListEncounterHeadings />
                        </div>
                        <br />
                        <div className="appLine encounter-report-column">
                            {recents.map(encounter =>
                                <div key={encounter.id}>
                                    <ListEncounter
                                        encounter_id={encounter.id}
                                        encounter_date={encounter.date.substring(0,10)}
                                        colonist_id={encounter.colonist_id}
                                        alienType={encounter.atype}
                                        action_taken={encounter.action}
                                    />
                                </div>
                            )}
                        </div>
                        <br />
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

class ListEncounterHeadings extends Component {
  render() {
    return (
        <h6>
            <span>Encounter</span>
            <span>Date</span>
            <span>Colonist</span>
            <span>Alien Type</span>
            <span>Action Taken</span>
        </h6>
    );
  }
}

class ListEncounter extends Component {
  render() {
    return (
        <h6>
            <span>{this.props.encounter_id}</span>
            <span>{this.props.encounter_date}</span>
            <span>{this.props.colonist_id}</span>
            <span>{this.props.alienType}</span>
            <span>{this.props.action_taken}</span>
        </h6>
    );
  }
}

export {NewEncounter, ListEncounters};