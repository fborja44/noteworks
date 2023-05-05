import NotFoundPage from "./NotFoundPage";
import BlockedIcon from "./icons/BlockedIcon";

const UnauthorizedPage = () => {
  return (
    <NotFoundPage icon={<BlockedIcon />}>Unauthorized access.</NotFoundPage>
  );
};

export default UnauthorizedPage;
