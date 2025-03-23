import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  createCourseServerApiUrl,
  uploadFileServerApiUrl,
} from "@/shared/variables/serverApiUrls";

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: Create Course
    const courseResponse = await fetchApiClient(createCourseServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!courseResponse.ok) {
      alert("Error creating course");
      setLoading(false);
      return;
    }

    const courseData = await courseResponse.json();
    const courseId = courseData.id;

    // Step 2: Upload Files (if any)
    if (files) {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("course_id", courseId.toString());

        await fetchApiClient(uploadFileServerApiUrl, {
          method: "POST",
          body: formData,
        });
      }
    }

    alert("Course Created!");
    setLoading(false);
    router.push("/cabinet/myCourses"); // Redirect to courses list
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Course Title"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box mt={2}>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </Container>
  );
}
