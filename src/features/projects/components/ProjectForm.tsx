import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Elements/Button';
import { TextField } from 'components/Form/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProject } from '../hooks/addProject';

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

export const ProjectForm = (props: AddProjectDialogProps) => {
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
      <div className="mb-4">
        <TextField
          {...register('name')}
          id="project-name"
          label="Name"
          placeholder="Project name"
          message={errors.name?.message}
          variant="critical"
        />

        <div>
          <label htmlFor="clientId">Client:</label>
          <select {...register('clientId')} id="clientId"></select>
        </div>

        <div>
          <label htmlFor="color">Color:</label>
          <input {...register('color')} type="color" id="color" />
        </div>

        <div>
          <label htmlFor="public">Visibility:</label>
          <label id="isPublic" className="font-normal">
            <input {...register('isPublic')} id="public" type="checkbox" />
            Public
          </label>
        </div>
        {status === 'error' && (
          <div className="text-red-500">Error occured</div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={status === 'loading'}>
          Add
        </Button>
      </div>
    </form>
  );
};
