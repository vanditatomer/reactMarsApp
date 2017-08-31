import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getRandomPuppy, getPuppyFact} from './request.js';

// CLASS PRACTICE

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {"age": 22};
    this.state = ({
      img: "Loading",
      fact: "Loading"
    });

    //Conditional Rendering
    this.state = ({
      messages: [1,2,3,4,5]
    });

  }

  componentDidMount() {
    getRandomPuppy
    .then((data)=> {
      console.log(data);
      this.setState({
        img: data
      })
    });

    getPuppyFact
    .then((data)=> {
      //console.log(data);
      this.setState({
        fact: data
      })
    });
  }

  //Handling events

  handleClick(e) {
    e.preventDefault()
    // var el = e.target
    // console.log(el);
    console.log("it works!")
  }

  clickHandler(e) {
    e.preventDefault()
    // var el = e.target
    // console.log(el);
    console.log("puppy!")
  }

   render() {
    if(this.state.messages) {
      return (

      <div className="App">
        <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <User name="Vandita" />

        <a href='#' onClick={this.handleClick.bind(this)}>
          <Puppy img= {this.state.img.message} />
        </a>

        <a href='#' onClick={this.clickHandler}>
          <Fact fact={this.state.fact} onClick={this.clickHandler} />
        </a>

          </div>

      );
      //fix this
    }else if(this.state.messages.length<3){
      return (<p>Not working!</p>);
    }else{
      return (<p>Happy Wednesday!</p>);
    }
  }
}

class User extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      update: false
    });

  }
  render() {
    return (
      <div className="user">
      <h1> {this.props.name} </h1>
      <p>{this.props.desc}</p>
      </div>
      );
  }
}

class Puppy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="puppy">
      <img src={this.props.img} />
      </div>
      );
  }
}

class Fact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fact">
      <p>{this.props.fact}</p>
      </div>
      );
  }

}




// class Button extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//     };
//   }

//   updateCount() {
//     this.setState((prevState, props) => {
//       return { count: prevState.count + 1 }
//     });
//   }

//   render() {
//     return (<button
//               onClick={() => this.updateCount()}
//             >
//               Clicked {this.state.count} times
//             </button>);
//   }
// }

export default App;