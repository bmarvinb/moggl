import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { FieldError } from 'common/components/FieldError';
import { FormField } from 'common/components/FormField';
import { Input } from 'common/components/Input';
import { Label } from 'common/components/Label';
import { Textarea } from 'common/components/Textarea';
import { useAddClient } from 'features/clients/hooks/useAddClient';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type AddClientDialogProps = {
  onClientAdded: () => void;
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a client name'),
  note: z.string(),
});

type FormValues = z.infer<typeof schema>;

export const ClientForm: FC<AddClientDialogProps> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate, status } = useAddClient();

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate(data, {
      onSuccess: () => props.onClientAdded(),
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
            placeholder="Client name"
          />
          <FieldError>{errors.name?.message}</FieldError>
        </FormField>
        <FormField>
          <Label htmlFor="note">Note:</Label>
          <Textarea
            {...register('note')}
            id="notes"
            size="md"
            placeholder="Client notes"
          />
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
