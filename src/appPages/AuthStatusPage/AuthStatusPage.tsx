import { Typography } from "@mui/material";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";

const AuthStatusPage = () => {
  const { user } = useAuth();
  return (
    <>
      <Typography variant="h5">Authentication status</Typography>
      <Typography variant="body2" color="textSecondary">
        {user ? "User authenticated" : "User is not authorized"}
      </Typography>
    </>
  );
};

export default AuthStatusPage;
