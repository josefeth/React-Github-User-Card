import React from "react";
import UserForm from "./UserForm";

const UserCard = props => {


    
  return (
    <div className='UserCard'>
          
      <img src={props.img} width="20%" alt={props.login}></img>
      <h2>{props.name}</h2>
      <span>GitHub handle: </span>
      <a href={props.url}>{props.login}</a>
      <p>Bio: {props.bio}</p>
      <p>Location: {props.location}</p>
    </div>
  );
};

export default UserCard;