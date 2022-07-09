import { extendTheme } from '@chakra-ui/react';

const theme = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        fontFamily: "'Ubuntu', sans-serif",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 'semibold',
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 'semibold',
      },
    },
  },
};

export default extendTheme(theme);
