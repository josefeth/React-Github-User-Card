import React from 'react';
import './App.css';
import axios from 'axios';
import UserCard from "./components/UserCard";
import FollowerCard from "./components/FollowersCard";
import UserForm from './components/UserForm';
import MyFilteringComponent from './components/MyFilteringComponent';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      user: [],
    followers: [],
      search: ''
    }
  }
 
  // state = {
  //   user: [],
  //   followers: [],
    
  // };
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

  getUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      axios.get(`https://api.github.com/users/${user}`)
      .then((res) => {
        const repos = res.data.repos_url;
        const login = res.data.login;
        const bio = res.data.bio;
        const avatar_url = res.data.avatar_url;
        const location = res.data.location;
        this.setState({ repos });
        this.setState({ login });
        this.setState({ bio });
        this.setState({ avatar_url });
        this.setState({ location });
      })
    } else return;
  }

  // handleOnChange = event => {
  //   this.setState({ searchValue: event.target.value });
  //   };
  //   handleSearch = () => {
      
  //   }
   updateSearch(event){
     console.log('yo')
     this.setState({search: event.target.value.substr(0,20)})
   }
  render() {
    let filteredUser = this.state.user.filter(
      (user) =>{
        return user.login.indexOf(this.state.search) !== -1;
      }
    )
    return (
      <div className="App">
        search bar
          <input
          // name="text"
          type="text"
          
          // onChange={event => this.handleOnChange(event)}
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}/>
          
{/* 
        <UserForm getUser={this.getUser} />
        {this.state.repos}<br></br>
        {this.state.login}<br></br>
        {this.state.bio}<br></br>
        {this.state.avatar_url}<br></br>
        {this.state.location}<br></br>
        <MyFilteringComponent /> */}

        <h1>GitHub User</h1>
        {filteredUser.map(item => (
          <UserCard
            key={item.id}
            name={item.name}
            login={item.login}
            bio={item.bio}
            img={item.avatar_url}
            url={item.html_url}
            location={item.location}
          />
        ))} 
        <h2>Followers:</h2>
        <div className="followers">
          {this.state.followers.map(item => (
            <FollowerCard
              key={item.id}
              login={item.login}
              img={item.avatar_url}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
