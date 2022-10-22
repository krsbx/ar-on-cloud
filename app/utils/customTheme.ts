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

export const chakraColor = (color: string, variant?: string) =>
  `var(--chakra-colors-${color}${variant ? `-${variant}` : ''})`;

export const chakraSpace = (type: string | number) => `var(--chakra-space-${type})`;

export default extendTheme(theme);
