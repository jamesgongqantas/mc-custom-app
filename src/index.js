import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './components/entry-point';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from "@apollo/react-hooks";

// Name of the localStorage item
const LOCAL_STORAGE_TOKEN = 'apollo-token';

const cache = new InMemoryCache();
const httpLink = new createHttpLink({
    credentials: 'same-origin',
//   uri: "https://api.services-dev.qantasloyalty.com/retailstore/query"
  uri: "http://localhost:3333/graphql"
//   uri: "https://api.commercetools.com/loyaltystore/graphql"
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  tokenName: LOCAL_STORAGE_TOKEN,
  connectToDevTools: true
});


ReactDOM.render(
    <ApolloProvider client={client}><EntryPoint /></ApolloProvider>, document.getElementById('app'));
