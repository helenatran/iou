import React from 'react'
import { Grid, Container, Button, Form } from 'semantic-ui-react'
import './register.css'

const Register = props => {

    return (
        
      <div class="centre">
        <div class="ui middle aligned center aligned grid">
  <div class="column">  
        <h1>Register</h1>
        
        <Form >
            <Form.Field>
                <Form.Input required label='First name' placeholder='First Name' />
            </Form.Field>
            <Form.Field>
                <Form.Input required label='Last name' placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
            <Form.Input required label='Email' placeholder='Email' />
            </Form.Field>
            <Form.Field>
            <Form.Input required label='Password' placeholder='Password'/>
            </Form.Field>
            
            <Button type='submit'>Submit</Button>
        </Form>
        </div> 
        </div> 
        </div>
   
       
    )
}

export default Register;