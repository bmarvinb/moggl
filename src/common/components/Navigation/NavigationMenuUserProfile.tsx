import { Button } from '../Elements/Button';

export type Profile = {
  email: string;
  name: string;
  profilePicture: string;
};

export type NavigatioinMenuIserProfileProps = {
  open: boolean;
  data: Profile;
};

const Avatar = (props: { avatarImageSource: string }) => (
  <div className="absolute w-10 overflow-hidden rounded-full border border-neutral-400/50 dark:border-neutral-dark-400/50">
    <img className="w-full" src={props.avatarImageSource} alt="Avatar" />
  </div>
);

export const NavigationMenuUserProfile = ({
  open,
  data,
}: NavigatioinMenuIserProfileProps) => (
  <Button round="none" className="px-3">
    <Avatar avatarImageSource={data.profilePicture} />
    <div className="flex flex-col pl-12 text-left">
      <div
        className='data-[state="open"]:opacity:100 duration-200  data-[state="closed"]:opacity-0'
        data-state={open ? 'open' : 'closed'}
      >
        {data.name}
      </div>
      <div
        className='data-[state="open"]:opacity:100 text-xs duration-200 data-[state="closed"]:opacity-0'
        data-state={open ? 'open' : 'closed'}
      >
        {data.email}
      </div>
    </div>
  </Button>
);
