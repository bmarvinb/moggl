import { zodResolver } from '@hookform/resolvers/zod';
import { ColorPicker } from 'common/components/ColorPicker';
import { Button } from 'common/components/Elements/Button';
import { FieldLabel } from 'common/components/Form/FieldLabel';
import { TextField } from 'common/components/Form/TextField';
import { Select, SelectOptions } from 'common/components/Select';
import { sample } from 'common/utils/array';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProject } from '../api/useAddProject';
import { COLORS } from '../constants/colors';

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
  const { control, register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: sample(COLORS).value,
    },
  });

  const { mutate, status } = useAddProject();

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(data, {
      onSuccess: () => props.onProjectAdded(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        id="project-name"
        label="Name"
        placeholder="Project name"
        invalid={Boolean(formState.errors.name)}
        fieldMessage={
          formState.errors.name?.message
            ? {
                message: formState.errors.name?.message,
                variant: 'error',
              }
            : undefined
        }
        className="mb-4"
      />

      <div className="mb-4">
        <Controller
          name="clientId"
          control={control}
          render={params => {
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
      </div>

      <div className="mb-4">
        <FieldLabel label="Project color" htmlFor="project-color" />
        <Controller
          name="color"
          control={control}
          render={params => {
            console.log('color params', params);

            return (
              <ColorPicker
                id="project-color"
                name="color"
                value={params.field.value}
                onChange={params.field.onChange}
                options={COLORS}
              />
            );
          }}
        />
      </div>

      <div>
        <label htmlFor="public">Visibility:</label>
        <label id="isPublic" className="font-normal">
          <input {...register('isPublic')} id="public" type="checkbox" />
          Public
        </label>
      </div>
      {status === 'error' && <div className="text-red-500">Error occured</div>}
      <div className="flex justify-end">
        <Button type="submit" disabled={status === 'loading'}>
          Add
        </Button>
      </div>
    </form>
  );
};
