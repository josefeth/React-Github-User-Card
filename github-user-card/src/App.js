import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class App extends React.Component {
  state = {
    user: [],
    followers: []
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/josefeth")
      .then(res => {
        this.setState({
          user: [res.data]
        });
        console.log('users',res.data);
      })
      .catch(err => console.log(err));
    axios
      .get("https://api.github.com/users/josefeth/followers")
      .then(res => {
        this.setState({ followers: res.data });
        console.log('followers',res.data);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <h1>GitHub User</h1>
        
      </div>
    );
  }
}
export default App;
