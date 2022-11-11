import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'common/components/Elements/Button';
import { FieldMessage } from 'common/components/Form/FieldMessage';
import { TextField } from 'common/components/Form/TextField';
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
          message={formState.errors.name?.message}
          variant={'critical'}
          className="mb-2"
        />

        {error && (
          <FieldMessage
            id="tag-form-error"
            message={error}
            variant="critical"
          />
        )}
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
