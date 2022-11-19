export type ProjectColor = {
  id: string;
  value: string | undefined;
  label: string;
};

export const PROJECT_COLORS: ProjectColor[] = [
  {
    id: 'Blue',
    value: '#4098D7',
    label: 'Blue',
  },
  {
    id: 'Yellow',
    value: '#F7C948',
    label: 'Vivid',
  },
  {
    id: 'Blue Grey',
    value: '#829AB1',
    label: 'Blue Grey',
  },
  {
    id: 'Cyan',
    value: '#54D1DB',
    label: 'Cyan',
  },
  {
    id: 'Red',
    value: '#F86A6A',
    label: 'Red',
  },
  {
    id: 'Teal',
    value: '#3EBD93',
    label: 'Teal',
  },
  {
    id: 'Warm Grey',
    value: '#A39E93',
    label: 'Warm Grey',
  },
  {
    id: 'Lime Green',
    value: '#ABDB5E',
    label: 'Lime Green',
  },
  {
    id: 'Orange',
    value: '#FF9466',
    label: 'Orange',
  },
];
