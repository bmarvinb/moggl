import { BiLoaderAlt } from 'react-icons/bi';

export const Spinner = () => (
  <BiLoaderAlt className="animate-spin text-blue-500" />
);

Spinner.defaultProps = {
  'aria-label': 'loading',
};
