import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from 'common/components/Checkbox';
import { Button } from 'common/components/Elements/Button';
import { TextField } from 'common/components/Form/TextField';
import { Select, SelectOptions } from 'common/components/Select';
import { sample } from 'common/utils/array';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { PROJECT_COLORS } from '../constants/colors';
import { ColorPicker } from './ColorPicker';

export type AddProjectDialogProps = {
  submitText: string;
  loading: boolean;
  error: string | null;
  onSubmit: (data: ProjectFormValues) => void;
  clients: SelectOptions;
  defaultValues?: ProjectFormValues;
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a project name'),
  clientId: z.string().optional(),
  color: z.string(),
  isPublic: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof schema>;

export const ProjectForm = ({
  loading,
  submitText,
  error,
  clients,
  defaultValues,
  onSubmit,
}: AddProjectDialogProps) => {
  const { control, register, handleSubmit, formState } =
    useForm<ProjectFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        color: sample(PROJECT_COLORS).value,
        isPublic: defaultValues?.isPublic || true,
        ...defaultValues,
      },
    });

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
          render={params => (
            <Select
              name="clientId"
              options={clients}
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
          )}
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
        <Controller
          name="isPublic"
          control={control}
          render={params => (
            <Checkbox
              id="is-public"
              label="Public"
              onChange={params.field.onChange}
              checked={Boolean(params.field.value)}
            />
          )}
        />
      </div>

      {error && (
        <div className="mb-4 text-red-500 dark:text-red-500">{error}</div>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          className="w-full justify-center"
          type="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};
