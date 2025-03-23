import { Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import CModal from "@/shared/components/CModal";
import {
  activateUser,
  cancelUserActivation,
} from "@/appPages/UserActivationPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { loginPagePath, mainPagePath } from "@/shared/variables/pagePaths";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";

const UserActivationPage = () => {
  const { query } = useRouter();
  const { uidb64, token } = query;
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { isLoading, setLoading } = useLoading();
  const { push } = useRouter();

  function handleCloseDeleteModal() {
    setEmail("");
    setDeleteModalOpen(false);
  }

  function handleConfirmDeleteModal() {
    setLoading(true);

    cancelUserActivation(email, uidb64)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Account successfully deleted",
            "success"
          );
          handleCloseDeleteModal();
          push(mainPagePath);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error can't be deleted",
            "error"
          );
        }
      })
      .catch((error) => {
        showSnackbar(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleActivate() {
    setLoading(true);

    activateUser(password, uidb64, token)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Account successfully activated",
            "success"
          );
          push(loginPagePath);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Activation error",
            "error"
          );
        }
      })
      .catch((error) => {
        showSnackbar(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Typography variant="h5">Account activation</Typography>
      <TextField
        label="Account password"
        type="password"
        value={password}
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={isLoading}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button
        onClick={handleActivate}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={isLoading}
      >
        Activate
      </Button>
      <Button
        onClick={() => setDeleteModalOpen(true)}
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ marginTop: 1 }}
        disabled={isLoading}
      >
        Delete account
      </Button>
      <CModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteModal}
        title="Cancel activation"
        confirmButtonName="Confirm"
        closeButtonName="Cancel"
        width={400}
      >
        <Typography>
          This action will delete your account with this email.
        </Typography>
        <Typography>
          If you want to cancel your registration, you need to type your email
          and click confirm.
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          fullWidth
          sx={{ marginTop: 1 }}
          disabled={isLoading}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </CModal>
    </>
  );
};

export default UserActivationPage;
