import React from "react";
import $ from 'jquery'
const axios = require('axios').default;



const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: ""
};

export default class Valiation extends React.Component {
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate() {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.name) {
      nameError = "name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (this.state.password.length < 3) {
      passwordError = " password lenght must be more than 3";
    }

    if (emailError || nameError || passwordError) {
      this.setState({ emailError, nameError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    $('.error').hide()
    if (isValid) {
      console.log(this.state);
      this.setState(initialState);
      axios.post('http://192.168.1.2:8080/javacore/api/user_form/for_submit', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then(function (response) {

          console.log(response.data.responseMessage);
          if (response.data.responseCode != '200') {
            $('.error').html(response.data.responseMessage)
            $('.error').show();
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    return (

      <div className="outerDiv">
        <div className="error" style={{ color: "red" }}></div>
         <form onSubmit={this.handleSubmit}>
        
     
        <div className="form-group">
        <label htmlFor="name">User Name</label>
          <input name="name" className="form-control" placeholder="username" value={this.state.name} onChange={this.handleChange} />
          <div className="errorr">
            {this.state.nameError}
          </div>
        </div>
        <div>
            <label htmlFor="email">Email</label>
          <input name="email" className="form-control" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
          <div className="errorr">
            {this.state.emailError}
          </div>
        </div>
        <div>
        <label htmlFor="password" >Password</label>
          <input  type="password" className="form-control" name="password"  placeholder="password" value={this.state.password}  onChange={this.handleChange}/>
          <div className="errorr">
            {this.state.passwordError}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> 
</div>

    );
  }
}       