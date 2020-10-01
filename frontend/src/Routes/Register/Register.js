import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import './register.css'
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleClick() {
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            requestsCompleted: 0
        }

        axios.post('/account/register', newUser)
            .then(console.log(this.state))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="centre">
              <div className="ui middle aligned center aligned grid">
                  <div className="column">  
                      <h1>Register</h1>
                      <Form >
                          <Form.Field>
                              <Form.Input value={this.state.firstName} onChange={this.onChangeFirstName.bind(this)} required label='First name' placeholder='First Name' />
                          </Form.Field>
                          <Form.Field>
                              <Form.Input value={this.state.lastName} onChange={this.onChangeLastName.bind(this)} required label='Last name' placeholder='Last Name' />
                          </Form.Field>
                          <Form.Field>
                              <Form.Input value={this.state.email} onChange={this.onChangeEmail.bind(this)} type="email" required label='Email' placeholder='Email' />
                          </Form.Field>
                          <Form.Field>
                              <Form.Input value={this.state.password} onChange={this.onChangePassword.bind(this)} type="password" required label='Password' placeholder='Password'/>
                          </Form.Field>
                          <Button onClick={() => this.handleClick()} type='submit'>Submit</Button>
                      </Form>
                  </div> 
              </div> 
          </div>
          )
    }
}

export default Register;