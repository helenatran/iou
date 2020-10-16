import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import './register.css';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../Errors/Error'
import axios from 'axios';

const Register = props => {
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ error, setError ] = useState();
    const [ errorState, setErrorState ] = useState();

    const history = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorState(false);
        try {
            const requestsCompleted = 0;
            const newRegisteredUser = { firstName, lastName, email, password, requestsCompleted }
            await axios.post('/api/user/register', newRegisteredUser)
            history.push('/login')
        } catch (err) {
            err.response.data.error && setError(err.response.data.error)
            setErrorState(true);
        }
    }

    return (
        <div className="centre">
            <div class="ui middle aligned center aligned grid">
                <div className="column">  
                    <h1>Register</h1>
                    { errorState === true ? <ErrorNotice message={error} clear={() => setError(undefined)} /> : "" }
                    <Form onSubmit={submitForm}>
                        <Form.Field>
                            <Form.Input 
                                required 
                                label='First name' 
                                placeholder='First Name'
                                onChange={(e) => setFirstName(e.target.value)} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                required 
                                label='Last name' 
                                placeholder='Last Name' 
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                type="email" 
                                required 
                                label='Email' 
                                placeholder='Email' 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                type="password" 
                                required 
                                label='Password' 
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            /> 
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div> 
            </div> 
        </div>
        )
}

export default Register;