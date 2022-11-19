import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from 'common/components/Checkbox';
import { Button } from 'common/components/Elements/Button';
import { FieldLabel } from 'common/components/Form/FieldLabel';
import { TextField } from 'common/components/Form/TextField';
import { Select, SelectOptions } from 'common/components/Select';
import { sample } from 'common/utils/array';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProject } from '../api/useAddProject';
import { PROJECT_COLORS } from '../constants/colors';
import { ColorPicker } from './ColorPicker';

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
      color: sample(PROJECT_COLORS).value,
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

      <div className="mb-4 flex items-center">
        <Controller
          name="color"
          control={control}
          render={params => {
            return (
              <ColorPicker
                name="color"
                label="Project color"
                value={params.field.value}
                onChange={params.field.onChange}
                options={PROJECT_COLORS}
              />
            );
          }}
        />
      </div>

      <div className="mb-4">
        <Checkbox id="is-public" label="Public" />
      </div>
      {status === 'error' && (
        <div className="mb-4 text-red-500 dark:text-red-500">Error occured</div>
      )}
      <div className="flex justify-end">
        <Button
          className="w-full justify-center"
          type="submit"
          disabled={status === 'loading'}
        >
          Add
        </Button>
      </div>
    </form>
  );
};
