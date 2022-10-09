import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Title } from 'common/components/Title';
import { FC } from 'react';

export type TagsContentTitleProps = {
  addNewTag: () => void;
};

export const TagsContentTitle: FC<TagsContentTitleProps> = props => {
  return (
    <Box
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '$10',
      }}
    >
      <Title as="h1">Tags</Title>
      <Button color="primary" onClick={props.addNewTag}>
        Add new
      </Button>
    </Box>
  );
};
