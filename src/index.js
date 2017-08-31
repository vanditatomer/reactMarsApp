import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// class nyt extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       posts: []
//     };
//   }

//   componentDidMount() {
//     App.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
//       .then(res => {
//         const posts = res.data.data.children.map(obj => obj.data);
//         this.setState({ posts });
//       });
//   }

//   render() {
//     return (
//       <div>
//         <h1>{`/r/${this.props.subreddit}`}</h1>
//         <ul>
//           {this.state.posts.map(post =>
//             <li key={post.id}>{post.title}</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }

import registerServiceWorker from './registerServiceWorker';

//setting a timer
function tick() {
  // const element = (
  //   <div>
  //     <h1>Hello, world!</h1>
  //     <h2>It is {new Date().toLocaleTimeString()}.</h2>
  //   </div>
  // );
  ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
}

setInterval(tick, 1000);


// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
