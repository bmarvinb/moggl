import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import { FieldError } from 'shared/components/FieldError';
import { FormField } from 'shared/components/FormField';
import { Input } from 'shared/components/Input';
import { Label } from 'shared/components/Label';
import { Textarea } from 'shared/components/Textarea';
import { useAddClient } from 'features/clients/hooks/addClient';
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
