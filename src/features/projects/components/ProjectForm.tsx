import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { FieldError } from 'common/components/FieldError';
import { FormField } from 'common/components/FormField';
import { Input } from 'common/components/Input';
import { Label } from 'common/components/Label';
import { useAddProject } from 'features/projects/hooks/useAddProject';
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
      <Box
        css={{
          marginBottom: '$8',
        }}
      >
        <FormField>
          <Label htmlFor="project">Name:</Label>
          <Input
            {...register('name')}
            aria-invalid={errors.name?.message ? 'true' : 'false'}
            id="project"
            size="md"
            placeholder="Project name"
          />
          <FieldError>{errors.name?.message}</FieldError>
        </FormField>
        <FormField>
          <Label htmlFor="clientId">Client:</Label>
          <select {...register('clientId')} id="clientId"></select>
        </FormField>
        <FormField>
          <Label htmlFor="color">Color:</Label>
          <input {...register('color')} type="color" id="color" />
        </FormField>
        <FormField>
          <Label htmlFor="isPublic">Visibility:</Label>
          <Box id="isPublic" as="label" css={{ fontWeight: '$normal' }}>
            <input {...register('isPublic')} type="checkbox" />
            Public
          </Box>
        </FormField>
        {status === 'error' && (
          <Box
            css={{
              color: '$red5',
            }}
          >
            Error occured
          </Box>
        )}
      </Box>

      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          gap: '$4',
        }}
      >
        <Button
          size="md"
          type="submit"
          color="primary"
          disabled={status === 'loading'}
        >
          Add
        </Button>
      </Box>
    </form>
  );
};
