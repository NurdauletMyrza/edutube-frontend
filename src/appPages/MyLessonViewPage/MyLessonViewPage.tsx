import { Box, Card, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonDetails } from "@/shared/utils/apiScripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useEffect, useState } from "react";
import { lessonViewPagesPath } from "@/shared/variables/pagePaths";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { DetailedLesson } from "@/shared/utils/types";
import LessonFileUploader from "@/appPages/MyLessonViewPage/components/LessonFileUploader";
import TestGenerator from "@/appPages/MyLessonViewPage/components/TestGenerator";

const MyLessonViewPage = () => {
  const { query, push } = useRouter();
  const { lessonId } = query;
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [lessonDetails, setLessonDetails] = useState<DetailedLesson>();

  async function fetchLessonDetails() {
    if (!!Number(lessonId) && !!user) {
      setLoading(true);

      getLessonDetails(Number(lessonId))
        .then((data) => {
          if (data.ok) {
            if (data.lessonDetails.module.course.author === user?.id) {
              setLessonDetails(data.lessonDetails);
            } else {
              push(`${lessonViewPagesPath}/${lessonId}`);
            }
          } else {
            showSnackbar(
              data["error"] ??
                data["detail"] ??
                data["message"] ??
                "Failed to get lesson details",
              "error"
            );
          }
        })
        .catch((error) => {
          showSnackbar(error, "error");
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    fetchLessonDetails();
  }, [lessonId, user]);

  console.log(lessonDetails, user);

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Typography variant="h4">Lesson View and Edit page</Typography>
      <Paper
        elevation={0}
        sx={{ padding: 2, borderRadius: 4, backgroundColor: "#F4F4F8" }}
      >
        <Typography variant="h5">{lessonDetails?.title}</Typography>
        <Card sx={{ padding: "20px" }}>
          <Typography variant="h6">
            Course name: {lessonDetails?.module.course.title}
          </Typography>
          <Typography variant="h6">
            Module name: {lessonDetails?.module.title}
          </Typography>
          <Typography variant="body1">{lessonDetails?.content}</Typography>
        </Card>
      </Paper>
      <TestGenerator />
      <LessonFileUploader lessonId={Number(lessonId)} />
    </Box>
  );
};

export default MyLessonViewPage;
