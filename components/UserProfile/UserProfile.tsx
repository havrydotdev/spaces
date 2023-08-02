import Image from "next/image";
import UserProfileProps from "./UserProfile.props";
import SettingsIcon from "@/public/settings.svg";

export const UserProfile = ({
  image,
  name,
  username,
  onClick,
}: UserProfileProps): React.JSX.Element => {
  return (
    <div className="fixed bottom-[33px] left-[42px] w-full">
      <div className="flex justify-between items-center max-w-[325px]">
        <div className="flex gap-[12px]">
          <Image
            src={image ?? "/public/user.png"}
            width={50}
            height={45}
            alt="user image"
            className="rounded-full"
          />
          <div>
            <h4 className="text-[18px] font-semibold text-[#242424]">
              {name ?? "Unknown user"}
            </h4>
            <h5 className="text-[16px] opacity-[0.5] text-[#242424]">
              @{username ?? "username"}
            </h5>
          </div>
        </div>
        <SettingsIcon
          className="cursor-pointer opacity-[0.5]"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
