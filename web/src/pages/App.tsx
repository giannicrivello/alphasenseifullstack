import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Routes from '../Routes';
import { accessToken, setAcessToken } from './accessToken';
import { Login } from './Login';
import { Register } from './Register';

interface Props {

}
//this logic will persist our user and keep then logged in as the page refreshes
//code reads calling our refresh token and useing it to get new access tokens for the user
//this is using the cookie we set in the browser to call to the server, seerver authenticates with 
//cookie and hands us back another accesstoken on refresh, its able to do this because of our fetch
export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:4000/refresh_token', {
            method: "POST",
            credentials: "include"
        })
        .then(async x => {
        const {accessToken} = await x.json();
        setAcessToken(accessToken);
        setLoading(false);
        })
    }, [])
    if (loading) {
        return <div>loading...</div>
    } else if (!accessToken) {
        return(
         <div>
             <BrowserRouter>
                    <Redirect to='/register' />
                    <Switch>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={Login}/>

                    </Switch>

             </BrowserRouter>
        </div>
        )
    }
        return (
           <Routes />
        );
} 

{/* <BrowserRouter>
<Redirect to='/register' />
<Route exact path='/register' component={Register} />
</BrowserRouter> */}