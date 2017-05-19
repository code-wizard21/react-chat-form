import React, { Component } from 'react';
import './App.css';
import ReactChatForm, {Stage, History, Field} from 'react-chat-form';
import form from "./reducers/form";
import {createStore} from "redux";

const store = createStore(form);

function update(property, response){
  store.dispatch({type: 'react-chat-form-update', property: property, response: response});
}
 
class App extends Component {
  constructor(){
    super();
    var questions = [new Stage("life", {preface: ["Hi! Welcome to the sample chat app"], title: "How is life?", field: {type: "text"}}, function(response, commit, reject){
      if(response.toLowerCase() === "good") commit(response);
      else reject("No, you have to respond \"good\"!");
    }, function(response){
      return ["Cool!"];
    }),
    new Stage("favCake", {title: "What is your favourite cake?", field: {type: "radio", options: ["Ice Cream Cake", "Strawberry Cake", "Cheesecake", "Other"]}}, function(response, commit, reject){commit(response);}, function(response){
      setTimeout(() => {alert(JSON.stringify(store.getState()));}, 500);
      switch(response){
        case "Ice Cream Cake": 
          return ["Ice cream is great!"];
        case "Strawberry Cake":
          return ["We all love strawberry!"];
        case "Cheesecake":
          return ["Gotta love the cheese :3"];
        default:
          return ["As long as we all love cake, it's good! :)"];
      }
    })];
    this.chatForm = new ReactChatForm(store, update, questions);
  }
  render() {
    return (
      <div className="App">
        <History form={this.chatForm} />
        <Field form={this.chatForm} />
      </div>
    );
  }
}

export default App;
