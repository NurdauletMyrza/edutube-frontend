import { useRouter } from "next/router";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import { getCourseDetails } from "@/shared/utils/apiScripts";

const MyCourseViewPage = () => {
  const { query } = useRouter();
  const { courseId } = query;
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [courseDetails, setCourseDetails] = useState<Course>();

  useEffect(() => {
    setLoading(true);

    getCourseDetails(Number(courseId))
      .then((data) => {
        if (data.ok) {
          setCourseDetails(data.courseDetails);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Failed to get course details",
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
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      {courseDetails ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            {courseDetails.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Author: {courseDetails.author}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Created at: {new Date(courseDetails.created_at).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" whiteSpace="pre-line">
            {courseDetails.description}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1">Загрузка данных курса...</Typography>
      )}
    </Paper>
  );
};

export default MyCourseViewPage;
