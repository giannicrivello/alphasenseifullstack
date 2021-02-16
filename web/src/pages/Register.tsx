import { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom'; //this allows us to use history for the redirect to home

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register] = useRegisterMutation();


    return (
        <Form onSubmit={async e => {
            e.preventDefault()
                console.log('registration submitted');
                const response = await register({
                    variables: {
                        email,
                        password
                    }
                });
                console.log(response)
                history.push('/technav')
        }}>
          <Form.Field>
            <label>First Name</label>
            <input value={email} placeholder='email' onChange={e => {
                setEmail(e.target.value);
            }} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input value={password} placeholder='password' onChange={e => {
                setPassword(e.target.value);
            }} />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Register</Button>
        </Form>
      )

}


