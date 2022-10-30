import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from 'shared/components/Card/Card';
import { Input } from 'shared/components/Input';
import { z } from 'zod';

export type TagsFilter = {
  archived: boolean;
  name: string;
};

const schema = z.object({
  archived: z.string().optional(),
  name: z.string().optional(),
});

export type TagsFilterCriteria = z.infer<typeof schema>;

export type TagsFilterProps = {
  criteria: TagsFilterCriteria;
  onChange: (changes: TagsFilterCriteria) => void;
};

export const TagsFilter: FC<TagsFilterProps> = props => {
  const { register, getValues } = useForm<TagsFilterCriteria>({
    resolver: zodResolver(schema),
    defaultValues: {
      archived: props.criteria ? props.criteria.archived : 'false',
      name: props.criteria ? props.criteria.name : '',
    },
  });

  const onFilterChange = () => {
    const { archived, name } = getValues();

    props.onChange({
      archived,
      name,
    });
  };

  return (
    <Card className="mb-6">
      <form onSubmit={e => e.preventDefault()} onChange={onFilterChange}>
        <div className="flex gap-8 px-6 py-8">
          <div>
            <select {...register('archived')} name="archived">
              <option value="false">Show active</option>
              <option value="true">Show archived</option>
            </select>
          </div>
          <div className="flex-1">
            <Input {...register('name')} name="name" placeholder="Tag name" />
          </div>
        </div>
      </form>
    </Card>
  );
};
