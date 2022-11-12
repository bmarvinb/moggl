import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'common/components/Elements/Button';
import { TextField } from 'common/components/Form/TextField';
import { Select, SelectOptions } from 'common/components/Select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProject } from '../api/useAddProject';

export type AddProjectDialogProps = {
  onProjectAdded: () => void;
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a project name'),
  clientId: z.string().optional(),
  color: z.string(),
  isPublic: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

// TODO: use real clients
const clientOptions: SelectOptions = [
  {
    id: '1',
    value: 'client-1',
    label: 'Client 1',
  },
  {
    id: '2',
    value: 'client-2',
    label: 'Client 2',
  },
];

export const ProjectForm = (props: AddProjectDialogProps) => {
  const {
    control,
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
          invalid={Boolean(errors.name)}
          fieldMessage={
            errors.name?.message
              ? {
                  message: errors.name?.message,
                  variant: 'error',
                }
              : undefined
          }
          className="mb-2"
        />

        <Controller
          name="clientId"
          control={control}
          render={params => {
            console.log('params', params);
            return (
              <Select
                id="project-client"
                name="clientId"
                options={clientOptions}
                label="Client"
                fieldMessage={
                  params.formState.errors.clientId?.message
                    ? {
                        message: params.formState.errors.clientId.message,
                        variant: 'error',
                      }
                    : undefined
                }
                invalid={Boolean(params.formState.errors.clientId)}
                value={params.field.value}
                onChange={params.field.onChange}
              />
            );
          }}
        />

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
