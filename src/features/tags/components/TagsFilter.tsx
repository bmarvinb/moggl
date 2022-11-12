import { Card } from 'common/components/Card/Card';
import { Input } from 'common/components/Form/Input';
import { Select, SelectOptions } from 'common/components/Select';
import { TagsSearchFilterCriteria } from '../hooks/useTagSearchCriteria';

type TagsFilterProps = {
  criteria: TagsSearchFilterCriteria;
  onFilterChange: (values: TagsSearchFilterCriteria) => void;
};

const options: SelectOptions = [
  {
    id: 'archived',
    value: 'true',
    label: 'Show archived',
  },
  {
    id: 'active',
    value: 'false',
    label: 'Show active',
  },
];

export const TagsFilter = ({ criteria, onFilterChange }: TagsFilterProps) => {
  return (
    <Card className="mb-6">
      <form onSubmit={e => e.preventDefault()}>
        <div className="flex gap-4 px-6 py-8">
          <div className="w-[10rem]">
            <Select
              id="tag-select"
              name="archived"
              value={criteria.archived}
              options={options}
              onChange={value =>
                onFilterChange({
                  ...criteria,
                  archived: value === 'true' ? 'true' : 'false',
                })
              }
            ></Select>
          </div>

          <div className="flex-1">
            <Input
              type="text"
              value={criteria.name}
              onChange={e =>
                onFilterChange({
                  ...criteria,
                  name: e.target.value,
                })
              }
              name="name"
              placeholder="Tag name"
            />
          </div>
        </div>
      </form>
    </Card>
  );
};
