import { Container } from '@material-ui/core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="lg" style={{ height: '100%' }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
