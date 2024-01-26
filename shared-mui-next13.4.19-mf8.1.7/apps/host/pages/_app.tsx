import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';

import './globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Welcome to template-host!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </StyledEngineProvider>
  );
}

export default CustomApp;
