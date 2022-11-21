import { assertNever } from 'common/utils/assert';
import toast from 'react-hot-toast';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

type ToastVariant = 'success' | 'error';

export function toaster(message: string, params: { variant: ToastVariant }) {
  return toast.custom(
    t => <Toast message={message} variant={params.variant} />,
    {
      duration: 3000,
      position: 'bottom-right',
    },
  );
}

const ToastIcon = ({ variant }: { variant: ToastVariant }) => {
  switch (variant) {
    case 'success':
      return (
        <BiCheckCircle className="shrink-0 text-xl text-cyan-400 dark:text-cyan-dark-400" />
      );
    case 'error':
      return (
        <BiXCircle className="shrink-0 text-xl text-red-400 dark:text-red-dark-400" />
      );
    default:
      return assertNever(variant);
  }
};

const Toast = ({
  variant,
  message,
}: {
  variant: ToastVariant;
  message: string;
}) => {
  return (
    <div className="flex max-w-[15rem] items-center gap-2 rounded-md border border-neutral-100 bg-neutral-50 p-3 shadow-sm dark:border-neutral-dark-100 dark:bg-neutral-dark-50">
      <ToastIcon variant={variant} />
      <div className="text-md">{message}</div>
    </div>
  );
};
