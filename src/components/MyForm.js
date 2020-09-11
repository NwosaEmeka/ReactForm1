import React, { Component } from 'react'
import './MyFormStyle.css'

const initialState = {
      name: "",
      email: "",
      password: "",
      nameError: "",
      emailError: "",
      passwordError: ""
}

class MyForm extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    this.setState(
      {[inputName] : inputValue}
    )
  }
  checkEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);

  }
  checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
  }
  validateForm = () => {
    
    let isValidEmail = this.checkEmail(this.state.email);
    let isValidPassword = this.checkPassword(this.state.password);

    if (this.state.name.trim() ==='') {
      this.setState({
        nameError: "Name cannot be blank"
      })
    }
    if (!isValidEmail) {
      this.setState(
        { emailError: "invalid email"}
      )
      return false
    }
    if (!isValidPassword) {
      this.setState(
        { passwordError: "Password must be at least 8 characters and contain uppercase, lowercase and number"}
      )
      return false
    }
    return true;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.name)
    let isValid = this.validateForm();
    if (isValid) {
      alert("form successfully submitted");
      // if the form is good, reset the state to initial state
      this.setState(initialState);
      console.log("valid form")
    } else {
      console.log("invalid form")
      setTimeout(() => {
        this.setState({
          passwordError: "",
          emailError: "",
          nameError: ""
        })
      },3000)
    }
  }
  render() { 
    return ( 
      <div>
        <h1 className="text__center">My Form</h1>
        <form className="form__group" onSubmit={this.handleSubmit}>
        <div className="form__element">
          <label htmlFor="name">Name:</label>
            <input type="text" name="name" required value={this.state.name} onChange={this.handleInput}
            className = {this.state.nameError? 'error': ''}
            />
            <span className="invalidMsg">{this.state.nameError}</span>
        </div>
        <div className="form__element">
          <label htmlFor="email">Email:</label>
            <input type="email" name="email" required value={this.state.email} onChange={this.handleInput}
              className = {this.state.emailError? 'error': ''}
            />
            <span className="invalidMsg">{this.state.emailError}</span>
        </div>
        <div className="form__element">
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password" required
              value={this.state.password}
              onChange={this.handleInput}
              className = {this.state.passwordError? 'error': ''}
            />
            <span className="invalidMsg">{this.state.passwordError}</span>
        </div>
        <button type="submit" className="btn__submit">Submit</button>
      </form>
      </div>
      
     );
  }
}
 
export default MyForm;