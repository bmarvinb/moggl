import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Dialog } from 'common/components/Dialog';
import { Container } from 'common/components/Container';
import { Title } from 'common/components/Title';
import { AddTagDialog } from 'features/tags/components/AddTagDialog';
import { Tags } from 'features/tags/models/tags';
import { FC, useState } from 'react';
import { Card } from 'common/components/Card';
import { BiArchive, BiPencil } from 'react-icons/bi';
import { Input } from 'common/components/Input';

export type TagsContentProps = {
  tags: Tags;
};

export const TagsContent: FC<TagsContentProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onClientAdded = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['tags']);
  };

  return (
    <Container
      css={{
        padding: '$8',
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '$10',
        }}
      >
        <Title as="h1">Tags</Title>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddTagDialog onTagAdded={onClientAdded} />{' '}
        </Dialog>
      </Box>

      <Card
        css={{
          marginBottom: '$6',
        }}
      >
        <Box
          css={{
            display: 'flex',
            padding: '$6 $8',
            gap: '$8',
          }}
        >
          <Box>
            <select>
              <option>Show active</option>
              <option>Show archived</option>
              <option>Show all</option>
            </select>
          </Box>
          <Box
            css={{
              flex: 1,
            }}
          >
            <Input placeholder="Tag name" />
          </Box>
        </Box>
      </Card>

      <Card
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.tags.map(tag => {
          return (
            <Box
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '$6 $8',
                borderBottom: '1px solid $neutral2',
              }}
              key={tag.id}
            >
              <Box>{tag.name}</Box>
              <Box
                css={{
                  display: 'grid',
                  gridTemplateColumns: 'auto auto',
                  gridColumnGap: '$4',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="icon"
                  size="md"
                  color="transparent"
                  aria-label="Edit tag"
                >
                  <BiPencil title="Edit tag" />
                </Button>

                <Button
                  variant="icon"
                  size="md"
                  color="transparent"
                  aria-label="Archive tag"
                >
                  <BiArchive title="Archive tag" />
                </Button>
              </Box>
            </Box>
          );
        })}
      </Card>
    </Container>
  );
};
