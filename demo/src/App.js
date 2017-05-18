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
    var questions = [new Stage("name", {title: "How is life?", field: {type: "text"}}, function(response, commit, reject){
      if(response.toLowerCase() === "good") commit(response);
      else reject("No, be happy!");
    }, function(response){
      return ["Cool!"];
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
