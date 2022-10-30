import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from 'shared/components/FieldError';
import { FormField } from 'shared/components/FormField';
import { Label } from 'shared/components/Label';
import { useAddProject } from 'features/projects/hooks/addProject';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextField } from 'shared/components/TextField';

export type AddProjectDialogProps = {
  onProjectAdded: () => void;
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a project name'),
  clientId: z.string(),
  color: z.string(),
  isPublic: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export const ProjectForm: FC<AddProjectDialogProps> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate, status } = useAddProject();

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(data, {
      onSuccess: () => props.onProjectAdded(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <TextField
          {...register('name')}
          id="project-name"
          label="Name"
          placeholder="Project name"
          message={errors.name?.message}
          tone="critical"
        />

        <FormField>
          <Label>Client:</Label>
          <select {...register('clientId')} id="clientId"></select>
        </FormField>

        <FormField>
          <Label>Color:</Label>
          <input {...register('color')} type="color" id="color" />
        </FormField>

        <FormField>
          <Label>Visibility:</Label>
          <label id="isPublic" className="font-normal">
            <input {...register('isPublic')} type="checkbox" />
            Public
          </label>
        </FormField>
        {status === 'error' && (
          <div className="text-red-500">Error occured</div>
        )}
      </div>

      <div className="flex flex-col justify-end gap-4">
        <button type="submit" disabled={status === 'loading'}>
          Add
        </button>
      </div>
    </form>
  );
};
