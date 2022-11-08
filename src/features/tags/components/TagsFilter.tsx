import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card } from 'common/components/Card/Card';
import { Input } from 'common/components/Form/Input';
import { z } from 'zod';

const schema = z.object({
  archived: z.string().optional(),
  name: z.string().optional(),
});

export type TagsSearchCriteria = z.infer<typeof schema>;

type TagsFilterProps = {
  criteria: TagsSearchCriteria;
  onChange: (changes: TagsSearchCriteria) => void;
};

export const TagsFilter = (props: TagsFilterProps) => {
  const { register, getValues } = useForm<TagsSearchCriteria>({
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
