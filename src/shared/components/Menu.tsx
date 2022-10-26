import { Box } from 'shared/components/Box';
import { styled } from 'theme/config';
import { NavLink } from 'react-router-dom';

export type MenuItem = {
  route: string;
  title: string;
  icon: JSX.Element;
};

export type MenuProps = {
  open: boolean;
  items: MenuItem[];
  onMenuItemClicked: () => void;
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
    background: '$navHoverBg',
    cursor: 'pointer',
  },
  '&.active': {
    background: '$navActiveBg',
    '&:hover': {
      background: '$navActiveBg',
      cursor: 'default',
    },
  },
  '&:focus-visible': {
    outlineColor: '$primary4',
    outlineStyle: 'solid',
    outlineWidth: '2px',
    outlineOffset: '-2px',
  },
});

const ListItem = styled('li', {
  overflowX: 'hidden',
  display: 'flex',
  alignItems: 'center',
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

export const Menu = ({ items, open, onMenuItemClicked }: MenuProps) => (
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
    <Box css={{}} as="ul">
      {items.map(item => (
        <ListItem key={item.route}>
          <Link
            to={item.route}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            onClick={() => onMenuItemClicked()}
          >
            <Icon>{item.icon}</Icon>
            <Title data-state={open ? 'open' : 'closed'}>{item.title}</Title>
          </Link>
        </ListItem>
      ))}
    </Box>
  </Box>
);
