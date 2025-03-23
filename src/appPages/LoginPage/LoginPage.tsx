import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { useRouter } from "next/router";
import { cabinetProfilePagePath } from "@/shared/variables/pagePaths";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { checkUserExistence, login } from "@/appPages/LoginPage/scripts";

const LoginPage = () => {
  const { isLoading, setLoading } = useLoading();
  const { user, reloadUser, logoutUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();

  function handleCheckEmail(event) {
    event.preventDefault();
    setLoading(true);

    checkUserExistence(email)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Account with this email exist",
            "success"
          );
          setStep(2);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error failed checking existence",
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

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);

    login(email, password)
      .then((data) => {
        if (data.ok) {
          showSnackbar(data["success"] ?? "Successfully login", "success");
          reloadUser();
          push(cabinetProfilePagePath);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Failed to login",
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

  if (!!user) {
    return (
      <Box margin={2}>
        <Typography variant="h5">You already sign in!</Typography>
        <Typography variant="body1">
          Current session account {user?.email ?? "is working"}.
        </Typography>
        <Box marginTop={1} display="flex" gap={1}>
          <Button onClick={logoutUser} variant="outlined" sx={{ flexGrow: 1 }}>
            Log out
          </Button>
          <Button
            onClick={() => push(cabinetProfilePagePath)}
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Go cabinet
          </Button>
        </Box>
      </Box>
    );
  }

  switch (step) {
    case 2:
      return (
        <Box component="form" onSubmit={handleLogin} margin={2}>
          <Typography variant="h5" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1">
            You are going to login as "{email}"
          </Typography>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            margin="normal"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Box display="flex" gap={1} marginTop={1}>
            <Button
              variant="outlined"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                setStep(1);
                setPassword("");
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ flexGrow: 1 }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      );
    default:
      return (
        <Box component="form" onSubmit={handleCheckEmail} margin={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={isLoading}
          >
            Next
          </Button>
        </Box>
      );
  }
};

export default LoginPage;
