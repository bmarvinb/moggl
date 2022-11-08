import { List } from 'common/components/List';
import { Tag } from '../types';
import { TagsItemContainer } from './TagsItemContainer';

type TagsListProps = {
  tags: Tag[];
  searchTerm: string;
};

export const Tags = ({ tags, searchTerm }: TagsListProps) => {
  return tags.length ? (
    <List>
      {tags.map(tag => (
        <TagsItemContainer key={tag.id} tag={tag} />
      ))}
    </List>
  ) : (
    <div className="p-4 text-center text-lg text-neutral-700 dark:text-neutral-dark-700">
      {searchTerm ? `No result found for "${searchTerm}"` : 'Nothing found'}
    </div>
  );
};
