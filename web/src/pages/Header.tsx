import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAcessToken } from './accessToken';


export const Header: React.FC = () => {
      //her is the me query that alllows us to pull in the user that is logging i=n
    //extra login in log in page
    const {data, loading} =useMeQuery();
    const [logout, {client}] = useLogoutMutation();


    let body: any = null;

    if (loading) {
        body = null
    } else if (data && data.me) {
        body = <div>you are logged in as : {data.me.email}</div>
        console.log(data.me)
    } else {
        <div>not logged in</div>
    }

    return (
      <Menu stackable>
        <Menu.Item>
          <img src='data:image/png;base64,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' />
        </Menu.Item>
        <Menu.Item>
        {!loading && data && data.me ? (data.me.email) : null}
        </Menu.Item>

        <Menu.Item
          name='register'
        >
          <Link to='/register'>Register</Link>
        </Menu.Item>

        <Menu.Item
          name='login'
        >
          <Link to='/login'>Login</Link>
        </Menu.Item>

        <Menu.Item
          name='sign-in'
        >
          <Link to='/'>My Techniques</Link>
        </Menu.Item>
        {!loading && data && data.me ? ( <button onClick={async () => {
          await logout();
          setAcessToken("");
          await client!.resetStore();
          }}>logout</button> ) : null}
          {/* {data && data.me ? ( <div> you are logged in as {data.me.email}</div>):<div>not logged in</div>} */}

      </Menu>
    )
  }



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useLogoutMutation, useMeQuery } from '../generated/graphql';
// import { setAcessToken } from './accessToken';

// interface Props {

// }

// export const Header: React.FC<Props> = () => {
//     //her is the me query that alllows us to pull in the user that is logging i=n
//     //extra login in log in page
//     const {data, loading} =useMeQuery();
//     const [logout, {client}] = useLogoutMutation();


//     let body: any = null;

//     if (loading) {
//         body = null
//     } else if (data && data.me) {
//         body = <div>you are logged in as : {data.me.email}</div>
//     } else {
//         <div>not logged in</div>
//     }


//         return (
//             <header>
//             <div>
//               <div>
//                 <Link to="/register">register</Link>
//               </div>
//               <div>
//                 <Link to="/login">login</Link>
//               </div>
//               <div>
//                 <Link to="/">home</Link>
//               </div>
//               <div>
//                 <Link to="/bye">bye</Link>
//               </div>
//               {!loading && data && data.me ? ( <button onClick={async () => {
//                   await logout();
//                   setAcessToken("");
//                   await client!.resetStore();
//               } }>logout</button> ) : null}
//             </div>
//             {data && data.me ? ( <div> you are logged in as {data.me.email}</div>):<div>not logged in</div>}
//           </header>
//         );
// }