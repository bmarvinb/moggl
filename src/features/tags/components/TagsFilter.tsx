import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'shared/components/Box';
import { Card } from 'shared/components/Card';
import { Input } from 'shared/components/Input';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
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
    <Card
      css={{
        marginBottom: '$6',
      }}
    >
      <form onSubmit={e => e.preventDefault()} onChange={onFilterChange}>
        <Box
          css={{
            display: 'flex',
            padding: '$6 $8',
            gap: '$8',
          }}
        >
          <Box>
            <select {...register('archived')} name="archived">
              <option value="false">Show active</option>
              <option value="true">Show archived</option>
            </select>
          </Box>
          <Box
            css={{
              flex: 1,
            }}
          >
            <Input {...register('name')} name="name" placeholder="Tag name" />
          </Box>
        </Box>
      </form>
    </Card>
  );
};
