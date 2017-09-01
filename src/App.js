import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    // FORM
    this.state = {
      name: " ",
      age: "",
      occupation: "Select occupation",
      encounters: "loading..."
    };

    //ENCOUNTERS
    this.state = {
      colonists: [],
      jobs: [],
      aliens: [],
      encounters: []
    };

    // FORM HANDLERS
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      encounters: []
    });
  }

   handleSubmit(event) {
    alert("Summitted!");
    event.preventDefault();
  }

  componentDidMount() {
    console.log("Component mounted.");

    this.getEncounters();
  }

  getColonists() {
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/colonists')
      .then((response) => {
        this.setState({colonists: response.data.colonists});
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  getJobs() {
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
    .then((response) => {
        this.setState({jobs: response.data.jobs});
    })
    .catch(function (error) {
        console.log(error);
    });
    }

    getAliens() {
      axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
      .then((response) => {
          this.setState({aliens: response.data.aliens});
          //console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    getEncounters() {
      axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
      .then((response) => {
          this.setState({encounters: response.data.encounters});
          //console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    postColonist() {
      axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
          "colonist" : {
              "name" : "Hooper",
              "age" : "37",
              "job_id" : "3"
          }
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    postEncounter() {
      axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
          "encounter" : {
            "atype" : "Octospider",
            "date" : "2017-08-31",
            "action" : "Web developer.",
            "colonist_id" : "4"
          }
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

  render() {
    return (

      // FORM
      <form>

        <label>
          Name:
          <input
            name="Name"
            type="text"
            checked={this.state.name}
            onChange={this.handleInputChange} />
        </label>

        <br />
        
        <label>
          Age:
          <input
            name="age"
            type="number"
            value={this.state.age}
            onChange={this.handleInputChange} />
        </label>

        <br />

        <label>
          Select Occupation:
          <select>
            <option defaultValue="selectOccupation">Select Occupation</option>
            <option value="alienHunter">Alien Hunter</option>
            <option value="yogaTeacher">Yoga Teacher</option>
            <option value="dustFarmer">Dust Farmer</option>
            <option value="frontEndDev">Front End Web Developer</option>
            <option value="bugKiller">Bug Killer</option>
            <option value="weedFarmer">Weed Farmer</option>
          </select>
        </label>

        <input type="submit" value="Submit" />

      </form>
      );
      // END OF FORM

      //ENCOUNTER
      if (this.state.colonists.length > 0) {
        let colonists = this.state.colonists;
        return (
            <div className="App">
                <div>
                    {colonists.map(colonist => <h6 key={colonist.id}>{colonist.id}, {colonist.name}, {colonist.age}, {colonist.job.id}, {colonist.job.name}, {colonist.job.description}</h6>)}
                </div>
            </div>
        );

        } else if (this.state.jobs.length > 0) {
            let jobs = this.state.jobs;

            return (
              <div className="App">
                  <div>
                      {jobs.map(job => <h6 key={job.id}>{job.id}, {job.name}, {job.description}</h6>)}
                  </div>
              </div>
            );

        } else if (this.state.aliens.length > 0) {
            let aliens = this.state.aliens;

            return (
              <div className="App">
                <div>
                    {aliens.map(alien => <h6 key={alien.id}>{alien.id}, {alien.type}, {alien.description}, {alien.submitted_by}</h6>)}
                </div>
              </div>
            );

        } else if (this.state.encounters.length > 0) {
            let encounters = this.state.encounters;

            return (
              <div className="App">
                <div>
                    {encounters.map(encounter => <h6 key={encounter.id}>{encounter.id}, {encounter.date}, {encounter.job_id}, {encounter.atype}, {encounter.action}</h6>)}
                </div>
              </div>
            );

        } else {
            return (
              <div className="App">
              </div>
            );
        }
      //END OF ENCOUNTER
  }
}

export default App;