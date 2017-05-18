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
    var questions = [new Stage("name", {title: "How is life?", field: {type: "text"}}, {prompted: false}, function(response, state, actions){
      let {prompted} = state;
      if(prompted === false || response !== "yes"){
        if(prompted === false) prompted = response; // cache response
        actions.next({title: "Are you sure?", field: {type: "text"}}, [], {prompted: prompted});
      }else{
        actions.done(prompted || state.response);
      }
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
