import { Box } from 'common/components/Box';
import { useWindowSize } from 'core/hooks/useWindowSize';
import React, { useLayoutEffect, useRef, useState } from 'react';

export const ReportedDaysContainer = (props: { children: React.ReactNode }) => {
  const [contentTop, setContentTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useLayoutEffect(() => {
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
