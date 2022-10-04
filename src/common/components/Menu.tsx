import { Box } from 'common/components/Box';
import { styled } from 'core/theme/config';
import { BiCalendar, BiTimer } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export const MenuItemLink = styled(NavLink, {
  padding: '$6 $9',
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  lineHeight: '$xl',
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

export const MenuItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  background: '$primary5',
});

export const Label = styled('div', {
  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
  variants: {
    size: {
      xs: {
        fontSize: '$xs',
        lineHeight: '$xs',
      },
    },
  },
});

export const Icon = styled('div', {
  fontSize: '$xl',
  display: 'flex',
});

export const Avatar = (props: { avatarImageSource: string }) => (
  <Box
    css={{
      minWidth: '2rem',
      minHeight: '2rem',
      maxWidth: '2rem',
      maxHeight: '2rem',
      borderRadius: '$full',
      overflow: 'hidden',
      border: '1px solid $colors$blackA5',
      img: {
        width: '100%',
      },
    }}
  >
    <img src={props.avatarImageSource} alt="Avatar" />
  </Box>
);

export const Item = (props: {
  avatarImageSource: string;
  open: boolean;
  username: string;
  email: string;
}) => (
  <Box
    as="button"
    css={{
      boxShadow: 'none',
      background: '$primary5',
      textAlign: 'left',
      border: 'none',
      color: '$lightTextColor',
      borderTop: '1px solid $colors$blackA5',
      padding: '$6 $7',
      display: 'flex',
      alignItems: 'center',
      gap: '$6',
      '&:hover': {
        background: '$primary4',
        cursor: 'pointer',
      },
    }}
  >
    <Avatar avatarImageSource={props.avatarImageSource} />
    <Box>
      <Label data-state={props.open ? 'open' : 'closed'}>
        {props.username}
      </Label>
      <Label size="xs" data-state={props.open ? 'open' : 'closed'}>
        {props.email}
      </Label>
    </Box>
  </Box>
);

export const User = styled('div', {});

export const Menu = (props: {
  open: boolean;
  avatarImageSource: string;
  username: string;
  email: string;
}) => {
  return (
    <Box
      css={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        color: '$neutral1',
        '&:focus-visible': {
          outlineColor: '$primary4',
          outlineStyle: 'solid',
        },
      }}
    >
      <Box as="ul">
        <MenuItem>
          <MenuItemLink
            to="/timer"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <Icon>
              <BiTimer />
            </Icon>
            <Label data-state={props.open ? 'open' : 'closed'}>Timer</Label>
          </MenuItemLink>
        </MenuItem>
        <MenuItem>
          <MenuItemLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="calendar"
          >
            <Icon>
              <BiCalendar />
            </Icon>
            <Label data-state={props.open ? 'open' : 'closed'}>Calendar</Label>
          </MenuItemLink>
        </MenuItem>
      </Box>

      <Item
        open={props.open}
        username={props.username}
        avatarImageSource={props.avatarImageSource}
        email={props.email}
      ></Item>
    </Box>
  );
};
