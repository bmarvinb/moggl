import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { DialogContent } from 'common/components/Dialog';
import { FormField } from 'common/components/FormField';
import { Input } from 'common/components/Input';
import { Label } from 'common/components/Label';

export const CreateProjectDialog = () => {
  return (
    <DialogContent>
      <Box>
        <Box
          css={{
            fontWeight: '$semibold',
            fontSize: '$lg',
            mb: '$6',
          }}
        >
          Create new project
        </Box>
        <form>
          <FormField>
            <Label htmlFor="project">Project:</Label>
            <Input id="project" size="md" placeholder="Type project name" />
          </FormField>
          <FormField>
            <Label htmlFor="client">Client:</Label>
            <select id="client">
              <option>Option 1</option>
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="color">Color:</Label>
            <select id="color">
              <option>Red</option>
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="visibility">Visibility:</Label>
            <Box id="visibility" as="label" css={{ fontWeight: '$normal' }}>
              <input type="checkbox" />
              Public
            </Box>
          </FormField>
          <Box
            css={{
              display: 'flex',
              justifyContent: 'end',
              gap: '$6',
            }}
          >
            <Button size="md" color="transparent">
              Cancel
            </Button>
            <Button size="md" type="submit" color="primary">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </DialogContent>
  );
};
