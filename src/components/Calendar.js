
import React from 'react';
export default class Calendar extends React.Component  {

    componentDidMount(){
        window.calldatepicker();
    }
  render() {
    return (
      
        <div id="datepicker"  style={{width:"360px"}}></div>

    );
  }
}