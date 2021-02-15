import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { setAcessToken } from './accessToken';




//this login will get us our access token on login


export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();


        return (
            <div>
                <form onSubmit={async e => {
                    e.preventDefault()
                    console.log('form submitted')
                    console.log(email, password);
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

                }}>
                    <div>
                        <input value={email} placeholder="email" onChange={e => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    <div>
                        <input value={password} placeholder="password" onChange={e => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <button type='submit'>login</button>
                </form>
            </div>
        );
}