import React, { Component } from 'react';
import './App.css';
import ReactChatForm, {Stage, History, FieldElement} from 'react-chat-form';
import form from "./reducers/form";
import {createStore} from "redux";

const store = createStore(form);

function update(property, response){
  store.dispatch({type: 'react-chat-form-update', property: property, response: response});
}
 
window.store = store;

class TextField extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    this.props.submit(this.refs['input'].value);
  }
  render() {
    return (<form onSubmit={this.submit}>
      <h3>{this.props.question.title}</h3>
      <input type="text" ref="input" />
      <p>{this.props.error}</p>
    </form>);
  }
}

class DelayIndicator extends Component {
  render() {
    return <h3>Loading...</h3>;
  }
}

class App extends Component {
  constructor(){
    super();
    function required(response) {
      return response === undefined || response === "" ? "This value is required" : false;
    }
    var questions = [new Stage("life", {preface: ["Hi! Welcome to the sample chat app"], title: "How is life?", field: {type: "custom", element: TextField}}, required, function(response){
      return ["Cool!"];
    }),
    new Stage("favCake", {title: "What is your favourite cake?", field: {type: "select", options: ["Ice Cream Cake", "Strawberry Cake", "Cheesecake", "Other"]}}, required, function(response){
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
    }, {
      shouldHide: (state) => state.life !== "good"
    })];
    this.chatForm = new ReactChatForm(store, update, questions);
  }
  render() {
    return (
      <div className="App">
        <History delay={1000} delayIndicator={DelayIndicator} form={this.chatForm} />
        <FieldElement form={this.chatForm} />
      </div>
    );
  }
}

export default App;
