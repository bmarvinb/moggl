import { Box } from 'common/components/Box';
import { styled } from 'core/theme/config';
import { NavLink } from 'react-router-dom';

export type MenuItem = {
  route: string;
  title: string;
  icon: JSX.Element;
};

export type MenuProps = {
  open: boolean;
  items: MenuItem[];
};

const Link = styled(NavLink, {
  padding: '$8 $9',
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  width: '100%',
  color: '$lightTextColor',
  textDecoration: 'none',
  '&:hover': {
    background: '$primary4',
    cursor: 'pointer',
  },
  '&.active': {
    background: '$primary6',
    '&:hover': {
      background: '$primary6',
      cursor: 'default',
    },
  },
});

const ListItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  background: '$primary5',
});

const Title = styled('div', {
  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
});

const Icon = styled('div', {
  fontSize: '$xl',
  display: 'flex',
});

export const Menu = ({ items, open }: MenuProps) => (
  <Box
    as="nav"
    css={{
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'column',
      color: '$neutral1',
      overflowY: 'scroll',
    }}
  >
    <Box
      css={{
        padding: '$1 0',
        overflowX: 'hidden',
      }}
      as="ul"
    >
      {items.map(item => (
        <ListItem key={item.route}>
          <Link
            to={item.route}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <Icon>{item.icon}</Icon>
            <Title data-state={open ? 'open' : 'closed'}>{item.title}</Title>
          </Link>
        </ListItem>
      ))}
    </Box>
  </Box>
);