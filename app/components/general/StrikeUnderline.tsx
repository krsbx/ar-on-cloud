import { Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const StrikeUnderline: ReactFC<Props> = ({
  isHovering,
  min = 0,
  max = 100,
  increment = 3,
  decrement = 5,
  ...rest
}) => {
  const intervalRef = useRef<NodeJS.Timer>();
  const [width, setWidth] = useState(0);
  const preferWidth = useMemo(() => `${width ?? 0}%`, [width]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setWidth((curr) => {
          if (curr >= max) {
            return max;
          }

          return curr + increment;
        });
      });

      return;
    }

    intervalRef.current = setInterval(() => {
      setWidth((curr) => {
        if (curr <= min) {
          return min;
        }

        return curr - decrement;
      });
    });
  }, [isHovering]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      position={'absolute'}
      bottom={0}
      borderWidth={width ? '2px' : '0px'}
      width={preferWidth}
      borderColor={'red'}
      {...rest}
    />
  );
};

type Props = BoxProps & {
  isHovering: boolean;
  min?: number;
  max?: number;
  increment?: number;
  decrement?: number;
};

export default StrikeUnderline;
