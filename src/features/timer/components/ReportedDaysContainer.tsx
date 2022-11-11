import React from 'react';
import { useWindowSize } from 'common/hooks/useWindowSize';

export type ReportedDaysContainerProps = {
  children: React.ReactNode;
};

export const ReportedDaysContainer = (props: ReportedDaysContainerProps) => {
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
      <div
        className="flex flex-1 flex-col "
        style={{ maxHeight: `calc(100vh - ${contentTop}px)` }}
        ref={contentRef}
      >
        <div className="flex flex-1 flex-col overflow-scroll bg-neutral-100 px-5 py-6 dark:bg-neutral-800">
          {props.children}
        </div>
      </div>
    </div>
  );
};
