import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'common/components/Elements/Button';
import { FieldMessage } from 'common/components/Form/FieldMessage';
import { TextField } from 'common/components/Form/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type TagFormProps = {
  loading: boolean;
  action: string;
  error: string | null;
  onSubmit: (data: TagFormValues) => void;
  defaultValues?: TagFormValues;
};

const tagFormSchema = z.object({
  name: z.string().min(1, 'Please provide a tag name'),
});

export type TagFormValues = z.infer<typeof tagFormSchema>;

export const TagForm = ({
  loading,
  action,
  error,
  onSubmit,
  defaultValues = { name: '' },
}: TagFormProps) => {
  const { register, handleSubmit, formState } = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues,
  });

  const submit: SubmitHandler<TagFormValues> = data => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <TextField
          {...register('name')}
          id="tag-name"
          label="Name"
          placeholder="Tag name"
          invalid={Boolean(formState.errors.name)}
          fieldMessage={
            formState.errors.name?.message
              ? {
                  message: formState.errors.name.message,
                  variant: 'error',
                }
              : undefined
          }
          className="mb-2"
        />

        {error && <FieldMessage data={{ message: error, variant: 'error' }} />}
      </div>

      <Button
        type="submit"
        className="w-full justify-center"
        variant="primary"
        loading={loading}
      >
        {action}
      </Button>
    </form>
  );
};
