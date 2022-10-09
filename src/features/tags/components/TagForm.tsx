import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { FieldError } from 'common/components/FieldError';
import { FormField } from 'common/components/FormField';
import { Input } from 'common/components/Input';
import { Label } from 'common/components/Label';
import { useAddTag } from 'features/tags/hooks/useAddTag';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type AddTagDialogProps = {
  onTagAdded: () => void;
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a tag name'),
});

type FormValues = z.infer<typeof schema>;

export const TagForm: FC<AddTagDialogProps> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate, status } = useAddTag();

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(data, {
      onSuccess: () => props.onTagAdded(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        css={{
          marginBottom: '$10',
        }}
      >
        <FormField>
          <Label htmlFor="name">Name:</Label>
          <Input
            {...register('name')}
            aria-invalid={errors.name?.message ? 'true' : 'false'}
            id="name"
            size="md"
            placeholder="Tag name"
          />
          <FieldError>{errors.name?.message}</FieldError>
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
