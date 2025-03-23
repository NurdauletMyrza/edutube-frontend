import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { fetchApiClient } from "@/shared/utils/apiClient";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { loginPagePath } from "@/shared/variables/pagePaths";

const CabinetProfilePage = () => {
  const { user, reloadUser, deleteUser, logoutUser } = useAuth();
  const { isLoading, setLoading } = useLoading();
  const { push } = useRouter();
  const [password, setPassword] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  }

  function handleCloseDeleteModal() {
    setPassword("");
    setIsDeleteModalOpen(false);
  }

  function handleDeleteUser() {
    deleteUser(password);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ textAlign: "center", p: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}>
          {user?.first_name?.charAt(0).toUpperCase()}
        </Avatar>
        <CardContent>
          <Typography variant="h5">{user?.email}</Typography>
          <Typography color="textSecondary">{user?.email}</Typography>
          {user?.first_name && user?.last_name && (
            <Typography>
              {user.first_name} {user.last_name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={logoutUser}
            fullWidth
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            fullWidth
          >
            Delete account
          </Button>
        </CardContent>
      </Card>
      <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            Do you want to delete your account?
          </Typography>
          <Typography>
            If you want to continue action type password and push "DELETE
            ACCOUNT" button
          </Typography>
          <TextField
            type="password"
            value={password}
            fullWidth
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box marginTop="16px" display="flex" gap="16px">
            <Button
              onClick={handleCloseDeleteModal}
              variant="outlined"
              sx={{ flexGrow: 1 }}
            >
              CANCEL
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              sx={{ flexGrow: 1 }}
            >
              DELETE ACCOUNT
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CabinetProfilePage;
