import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider, createHttpLink } from '@apollo/react-hooks';
import { getAccessToken } from './pages/accessToken';
import { setContext } from '@apollo/client/link/context'
import { App } from './pages/App';





// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: "include",
//   request: (operation) => {
//     const accessToken = getAccessToken()
//     operation.setContext({
//       headers: {
//         authorization: accessToken ? `bearer ${accessToken}`: ''
//       }
//     })
//   }
// });


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: "include",
});

//this is used for setting up the protected route which in this case is bye
// bottom line of code reads as setting Context(provided by apollo) to authlink
//setting accesstoken with getAccessToken  which we made in accessToken function
//then setting the access token into the headers

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  }
});
//then set this new header into the apolloClient
const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});






ReactDOM.render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
