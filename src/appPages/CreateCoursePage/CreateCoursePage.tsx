import { useState, FormEvent } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { createCourse } from "@/appPages/CreateCoursePage/scripts"; // если Pages Router
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { myCourseViewPagesPath } from "@/shared/variables/pagePaths";

const CreateCoursePage = () => {
  const { push } = useRouter();
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreateCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    createCourse(title, description)
      .then((data) => {
        if (data.ok) {
          showSnackbar(data["success"] ?? "Successfully created", "success");
          push(`${myCourseViewPagesPath}/${data.id}`);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Failed to create course",
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
    <Paper sx={{ backgroundColor: "#F4F4F8", padding: 3, borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a new course
      </Typography>
      <Box component="form" onSubmit={handleCreateCourse}>
        <TextField
          label="Name"
          fullWidth
          required
          margin="normal"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ backgroundColor: "white" }}
        />
        <TextField
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{ backgroundColor: "white" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateCoursePage;
