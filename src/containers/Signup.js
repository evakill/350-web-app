import React, { Component } from "react";
import 'whatwg-fetch';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      email: "",
      password: "",
      name:"",
      newUser: null,
      error: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.name.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onSignUp() {
    // // Grab state
    // const {
    //   signUpEmail,
    //   signUpPassword,
    //   signUpName,
    // } = this.state;

    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
    .then(response=>response.json())
    .then(json => {
        console.log('json', json);
        if (json.success) {
          alert("Logged In")
          // this.setState({
          //   signUpError: json.message,
          //   isLoading: false,
          //   signUpEmail: '',
          //   signUpPassword: '',
          // });
        } else {
          alert(json.message)
          // this.setState({
          //   signUpError: json.message,
          //   isLoading: false,
          // });
        }
      });
      alert("reached the bottom onsubmit")
  }

  handleSubmit() {
    // Grab state
    // const {
    //   email,
    //   password,
    //   name,
    // } = this.state;

    // this.setState({
    //   isLoading: true,
    // });
    // Post request to backend
    alert("we made it")
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.name,
        name: this.state.password,
      }),
    })
    .then(response=>response.json())
    .then(json => {
        alert("we made it in here")
        console.log('json', json);
        if (json.success) {
          alert("Logged In")
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          alert(json.message)
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });

      alert("reached the bottom")

    // this.setState({ isLoading: true });
    // alert("It worked!!")
    // var email = this.email
    // var name = this.name
    // var password = this.password
    // // Post request to backend
    // fetch('/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   cache: "no-cache",
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     name: name,
    //   }),
    // }).then(res => res.json())
    //   .then(json => {
    //     console.log('json', json);
    //     if (json.success) {
    //       alert("It worked!!")
    //       this.setState({
    //         error: json.message,
    //         isLoading: false,
    //       });
    //     } else {
    //       alert(json.message)
    //       this.setState({
    //         signUpError: json.message,
    //         isLoading: false,
    //       });
    //     }
    //   });
  }



  renderForm() {
    return (
      <form onSubmit={this.onSignUp}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Signup
        </Button>
        <button onClick={this.onSignUp}>Sign Up</button>
      </form>
    );
  }

  render() {
   return (
      <div className="Signup">
          {this.renderForm()}
      </div>
    );
  }
}




