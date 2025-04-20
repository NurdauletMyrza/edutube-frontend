import { Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonDetails } from "@/shared/utils/apiScripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useEffect, useState } from "react";
import { lessonViewPagesPath } from "@/shared/variables/pagePaths";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { DetailedLesson } from "@/shared/utils/types";

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
    <Paper elevation={0}>
      Lesson view page: {lessonId}
      <Typography variant="h3">{lessonDetails?.title}</Typography>{" "}
    </Paper>
  );
};

export default MyLessonViewPage;
