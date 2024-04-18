import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';

import './globals.css';

import '../mf-config/init';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Welcome to the Host App!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </StyledEngineProvider>
  );
}

export default CustomApp;
