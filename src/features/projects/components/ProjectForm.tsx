import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from 'shared/components/FieldError';
import { FormField } from 'shared/components/FormField';
import { Label } from 'shared/components/Label';
import { useAddProject } from 'features/projects/hooks/addProject';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

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
        <FormField>
          <Label>Name:</Label>
          <input
            {...register('name')}
            aria-invalid={errors.name?.message ? 'true' : 'false'}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 invalid:focus:border-red-500 invalid:focus:ring-red-500 sm:text-sm`}
            id="project"
            placeholder="Project name"
          />
          <FieldError>{errors.name?.message}</FieldError>
        </FormField>
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
