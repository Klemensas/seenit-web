import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { apolloClient } from './apollo';
import { container } from './common/helpers/general';
import ExtensionSetupBlocker from './ExtensionSetupBlocker';

(async () => {
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ExtensionSetupBlocker>
          <App />
        </ExtensionSetupBlocker>
      </BrowserRouter>
    </ApolloProvider>,
    container || null,
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
