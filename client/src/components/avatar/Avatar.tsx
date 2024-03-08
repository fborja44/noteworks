import styled from "@emotion/styled";
import { COLOR } from "../../common/color";
import { User } from "firebase/auth";
import SmileIcon from "../icons/SmileIcon";

interface ProfileProps {
  size: number;
}

const ProfileImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props: ProfileProps) => props.size}px;
  width: ${(props: ProfileProps) => props.size}px;
  background: ${COLOR.blue.primary};
  color: white;
  border-radius: 1000em;

  svg {
    width: 70px;
    height: 70px;
  }
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props: ProfileProps) => props.size}px;
  width: ${(props: ProfileProps) => props.size}px;
  background: ${COLOR.blue.primary};
  border-radius: 1000em;
`;

interface AvatarProps {
  currentUser: User;
  size: number;
}

const Avatar = ({ currentUser, size }: AvatarProps) => {
  return currentUser.photoURL ? (
    <ProfileImage src={currentUser.photoURL} alt="Profile Image" size={size} />
  ) : (
    <ProfileIcon size={size}>
      <SmileIcon className={'smile'} />
    </ProfileIcon>
  );
};

Avatar.defaultProps = {
  size: 30,
};

export default Avatar;
