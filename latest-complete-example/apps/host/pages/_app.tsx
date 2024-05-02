import { AppProps } from 'next/app';
import Head from 'next/head';
import { StyledEngineProvider } from '@mui/material';
import initMF from '../mf-config/init';
import initElectron from '../electron-config/init';
import './globals.css';

initMF()
process.env['NEXT_PUBLIC_ELECTRON_BUILD'] !== 'true' && initElectron()

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
