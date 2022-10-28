import { FC } from 'react';
import { Title } from 'shared/components/Title';

export type TagsContentTitleProps = {
  addNewTag: () => void;
};

export const TagsContentTitle: FC<TagsContentTitleProps> = props => {
  return (
    <div className="mb-5 flex justify-between align-baseline">
      <Title>Tags</Title>
      <button onClick={props.addNewTag}>Add new</button>
    </div>
  );
};
