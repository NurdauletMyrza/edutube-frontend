import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { fetchApiClient } from "@/shared/utils/apiClient";
import { registerUserServerApiUrl } from "@/shared/variables/serverApiUrls";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetchApiClient(registerUserServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);
    console.log(data);

    if (!response.ok) {
      setError(data.email || data.password || "Ошибка регистрации.");
    } else {
      setSuccess("Регистрация успешна! Проверьте почту для активации.");
      setFormData({
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Имя"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Фамилия"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Подтвердите пароль"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
