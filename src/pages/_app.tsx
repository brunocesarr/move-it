import '../styles/global.css';

import { Session } from 'inspector';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';

function MyApp({
  Component,
  pageProps,
}: AppProps & { session: Session }): JSX.Element {
  const sessionApp = pageProps.session;

  return (
    <Provider
      session={sessionApp}
      options={{
        clientMaxAge: 60 * 60,
        keepAlive: 120 * 60,
      }}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
