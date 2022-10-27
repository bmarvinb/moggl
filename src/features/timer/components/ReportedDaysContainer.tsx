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
      <div className="flex w-full flex-1 flex-col">
        <Box
          ref={contentRef}
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            maxHeight: `calc(100vh - ${contentTop + 1}px)`,
          }}
        >
          <div className="flex flex-1 flex-col overflow-scroll bg-slate-200 p-4 dark:bg-slate-800">
            {props.children}
          </div>
        </Box>
      </div>
    );
  };
