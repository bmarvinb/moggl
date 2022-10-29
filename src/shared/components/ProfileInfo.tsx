export type ProfileInfoData = {
  email: string;
  name: string;
  profilePicture: string;
};

export type ProfileInfoProps = {
  open: boolean;
  profileInfo: ProfileInfoData;
};

const Avatar = (props: { avatarImageSource: string }) => (
  <div className="absolute w-10 overflow-hidden rounded-full border border-neutral-400/50">
    <img className="w-full" src={props.avatarImageSource} alt="Avatar" />
  </div>
);

export const ProfileInfo = ({ open, profileInfo }: ProfileInfoProps) => (
  <button className="border-b-none flex items-center gap-6   bg-primary-400 px-3 py-3 text-left text-sm text-neutral-100 shadow-none hover:cursor-pointer  hover:bg-primary-300 dark:bg-primaryDark-400 dark:hover:bg-primaryDark-300">
    <Avatar avatarImageSource={profileInfo.profilePicture} />
    <div className="pl-12">
      <div
        className='duration-200 data-[state="open"]:opacity:100  data-[state="closed"]:opacity-0'
        data-state={open ? 'open' : 'closed'}
      >
        {profileInfo.name}
      </div>
      <div
        className='duration-200 data-[state="open"]:opacity:100 text-xs data-[state="closed"]:opacity-0'
        data-state={open ? 'open' : 'closed'}
      >
        {profileInfo.email}
      </div>
    </div>
  </button>
);
