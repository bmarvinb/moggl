import { Box } from 'shared/components/Box';
import { styled } from 'theme/config';

export type ProfileInfoData = {
  email: string;
  name: string;
  profilePicture: string;
};

export type ProfileInfoProps = {
  open: boolean;
  profileInfo: ProfileInfoData;
};

const Title = styled('div', {
  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
});

const Email = styled('div', {
  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
  fontSize: '$xs',
  lineHeight: '$xs',
});

const Avatar = (props: { avatarImageSource: string }) => (
  <Box
    css={{
      minWidth: '2.5rem',
      minHeight: '2.5rem',
      maxWidth: '2.5rem',
      maxHeight: '2.5rem',
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

export const ProfileInfo = ({ open, profileInfo }: ProfileInfoProps) => (
  <Box
    as="button"
    css={{
      fontSize: '$sm',
      boxShadow: 'none',
      background: '$navBg',
      textAlign: 'left',
      border: 'none',
      color: '$lightTextColor',
      padding: '$3 $6',
      display: 'flex',
      alignItems: 'center',
      gap: '$6',
      '&:hover': {
        background: '$navHoverBg',
        cursor: 'pointer',
      },
      '&:focus-visible': {
        outlineColor: '$primary4',
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '-2px',
      },
    }}
  >
    <Avatar avatarImageSource={profileInfo.profilePicture} />
    <Box>
      <Title data-state={open ? 'open' : 'closed'}>{profileInfo.name}</Title>
      <Email data-state={open ? 'open' : 'closed'}>{profileInfo.email}</Email>
    </Box>
  </Box>
);
