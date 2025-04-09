import { Box, Stack, Typography } from "@mui/material";
import { IUser } from "../interfaces/IUser";
import { UserImageStyle } from "./Dashboard/styles";

const ProfilePicture = ({
  user,
  showDetails,
}: {
  user: IUser;
  showDetails?: boolean;
}) => {
  console.log({ user });
  const initials = `${
    user?.firstName ? user?.firstName[0]?.toUpperCase() : ""
  }`;
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      {user?.profilePicture ? (
        <img src={user?.profilePicture} />
      ) : (
        <UserImageStyle>{initials}</UserImageStyle>
      )}
      {showDetails && (
        <Box>
          <Typography fontSize="12px">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography fontSize="12px">{user.email}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default ProfilePicture;
