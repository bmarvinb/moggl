import { zodResolver } from '@hookform/resolvers/zod';
import { AddTagDTO, Tag, UpdateTagDTO } from 'features/tags/models/tags';
import { DialogMode } from 'layout/models/dialog-mode';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'shared/components/Button';
import { FormError } from 'shared/components/FormError';
import { TextField } from 'shared/components/TextField';
import { z } from 'zod';

export type AddTagData = {
  operation: DialogMode.Add;
  onSubmit: (data: AddTagDTO) => void;
};

export type UpdateTagData = {
  operation: DialogMode.Update;
  tag: Tag;
  onSubmit: (data: UpdateTagDTO) => void;
};

type TagData = AddTagData | UpdateTagData;

export type TagFormProps = TagData & {
  loading: boolean;
  error?: string;
};

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

  const onSubmit: SubmitHandler<FormValues> = data => {
    props.onSubmit(
      props.operation === DialogMode.Update ? { ...props.tag, ...data } : data,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <TextField
          {...register('name')}
          id="tag-name"
          label="Name"
          placeholder="Tag name"
          message={formState.errors.name?.message}
          tone={'critical'}
        />

        {props.error && <FormError>{props.error}</FormError>}
      </div>

      <Button
        type="submit"
        className="w-full justify-center"
        variant="primary"
        loading={props.loading}
        disabled={props.loading}
      >
        {submitTitle[props.operation]}
      </Button>
    </form>
  );
};
