import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from 'components/MainLayout';
import useUrlHashListener from 'hooks/useUrlHashListener';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import 'styles/globals.scss';
import customTheme from 'utils/customTheme';

function MyApp({ Component, pageProps }: AppProps) {
  // Subscribe to any kind of changes in hash from next/window
  //  By re-rendering the page by changing a state
  useUrlHashListener();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={customTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default MyApp;
