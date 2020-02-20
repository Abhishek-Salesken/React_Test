import React, { Component } from 'react';
import $ from 'jquery';
import DateTimePicker from 'react-datetime-picker';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component{

  render(){
    return(<div className="App">
      <Calendar/>     
    </div>)
  }
}


export default App;
