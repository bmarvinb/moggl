import { Box } from 'shared/components/Box';
import { useWindowSize } from 'shared/hooks/windowSize';
import React from 'react';

export type ReportedDaysContainerProps = {
  children: React.ReactNode;
};

export const ReportedDaysContainer: React.FC<ReportedDaysContainerProps> =
  props => {
    const [contentTop, setContentTop] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const size = useWindowSize();

    React.useLayoutEffect(() => {
      if (!contentRef.current) {
        return;
      }
      const { y } = contentRef.current.getBoundingClientRect();
      setContentTop(y);
    }, [contentRef, size.width]);

    return (
      <Box
        css={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          ref={contentRef}
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            maxHeight: `calc(100vh - ${contentTop + 1}px)`,
          }}
        >
          <Box
            css={{
              padding: '1rem',
              overflow: 'scroll',
              background: '$neutral2',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {props.children}
          </Box>
        </Box>
      </Box>
    );
  };
