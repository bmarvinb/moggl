import { Card } from 'common/components/Card/Card';
import { Input } from 'common/components/Form/Input';
import { Select } from 'common/components/Select';
import { TagsSearchFilterCriteria } from '../hooks/useTagSearchCriteria';

type TagsFilterProps = {
  criteria: TagsSearchFilterCriteria;
  onFilterChange: (values: TagsSearchFilterCriteria) => void;
};

export const TagsFilter = ({ criteria, onFilterChange }: TagsFilterProps) => {
  return (
    <Card className="mb-6">
      <form onSubmit={e => e.preventDefault()}>
        <div className="flex gap-4 px-6 py-8">
          <Select />
          {/* <select
              name="archived"
              value={criteria.archived}
              onChange={e =>
                onFilterChange({
                  ...criteria,
                  archived: e.target.value === 'true' ? 'true' : 'false',
                })
              }
            >
              <option value="false">Show active</option>
              <option value="true">Show archived</option>
            </select> */}
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
