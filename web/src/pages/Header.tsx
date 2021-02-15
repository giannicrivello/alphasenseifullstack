import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAcessToken } from './accessToken';

interface Props {

}

export const Header: React.FC<Props> = () => {
    //her is the me query that alllows us to pull in the user that is logging i=n
    //extra login in log in page
    const {data, loading} =useMeQuery();
    const [logout, {client}] = useLogoutMutation();


    let body: any = null;

    if (loading) {
        body = null
    } else if (data && data.me) {
        body = <div>you are logged in as : {data.me.email}</div>
    } else {
        <div>not logged in</div>
    }


        return (
            <header>
            <div>
              <div>
                <Link to="/register">register</Link>
              </div>
              <div>
                <Link to="/login">login</Link>
              </div>
              <div>
                <Link to="/">home</Link>
              </div>
              <div>
                <Link to="/bye">bye</Link>
              </div>
              {!loading && data && data.me ? ( <button onClick={async () => {
                  await logout();
                  setAcessToken("");
                  await client!.resetStore();
              } }>logout</button> ) : null}
            </div>
            {data && data.me ? ( <div> you are logged in as {data.me.email}</div>):<div>not logged in</div>}
          </header>
        );
}