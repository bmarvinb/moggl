import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { FieldError } from 'common/components/FieldError';
import { FormError } from 'common/components/FormError';
import { FormField } from 'common/components/FormField';
import { Input } from 'common/components/Input';
import { Label } from 'common/components/Label';
import { DialogMode } from 'core/models/application/dialog-mode';
import {
  AddTagRequestData,
  Tag,
  UpdateTagRequestData,
} from 'features/tags/models/tags';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type AddTagData = {
  operation: DialogMode.Add;
  onSubmit: (data: AddTagRequestData) => void;
};

export type UpdateTagData = {
  operation: DialogMode.Update;
  tag: Tag;
  onSubmit: (data: UpdateTagRequestData) => void;
};

type TagData = AddTagData | UpdateTagData;

export type TagFormProps = TagData & { status: string };

const submitTitle: Record<DialogMode, string> = {
  [DialogMode.Add]: 'Add',
  [DialogMode.Update]: 'Update',
};

const schema = z.object({
  name: z.string().min(1, 'Please provide a tag name'),
});

type FormValues = z.infer<typeof schema>;

export const TagForm: FC<TagFormProps> = props => {
  const { register, watch, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.operation === DialogMode.Update ? props.tag.name : '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data =>
    props.onSubmit(
      props.operation === DialogMode.Update ? { ...props.tag, ...data } : data,
    );

  const notEditedName =
    props.operation === DialogMode.Update && props.tag.name === watch('name');

  const submitDisabled = props.status === 'loading' || notEditedName;

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
            aria-invalid={formState.errors.name?.message ? 'true' : 'false'}
            id="name"
            size="md"
            placeholder="Tag name"
          />
          <FieldError>{formState.errors.name?.message}</FieldError>
        </FormField>
        {props.status === 'error' && <FormError>Error occured</FormError>}
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
          disabled={submitDisabled}
        >
          {submitTitle[props.operation]}
        </Button>
      </Box>
    </form>
  );
};
