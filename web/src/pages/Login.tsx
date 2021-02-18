import { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { MeDocument, MeQuery, useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom'; //this allows us to use history for the redirect to home
import { setAcessToken } from './accessToken';

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    


    return (
        <Form onSubmit={async e => {
            
                console.log('registration submitted');
                const response = await login({
                    variables: {
                        email,
                        password
                    },
                    
                    //updating with the me query
                    update: (store, {data}) => {
                        if (!data) {
                            return null;
    
                        }
                        //on login this is returning back the user that is logging in with the mequery
                        store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                me: data.login.user
                            }
                        })
                        
                    }
                });
                console.log(response)

                if (response && response.data) {
                    setAcessToken(response.data.login.accessToken);
                }
                history.push('/')
                window.location.reload()

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
          <Button type='submit'>Login</Button>
        </Form>
      )

}
