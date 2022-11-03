import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from 'components/MainLayout';
import useUrlHashListener from 'hooks/useUrlHashListener';
import type { AppProps } from 'next/app';
import { createRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import 'styles/globals.scss';
import theme from 'utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const contentRef = createRef<HTMLDivElement>();

  // Subscribe to any kind of changes in hash from next/window
  //  By re-rendering the page by changing a state
  useUrlHashListener();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <MainLayout contentRef={contentRef}>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default MyApp;
