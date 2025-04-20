import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonDetails } from "@/shared/utils/apiScripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useEffect, useState } from "react";
import { myLessonViewPagesPath } from "@/shared/variables/pagePaths";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { DetailedLesson } from "@/shared/utils/types";

const LessonViewPage = () => {
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
            console.log(data.lessonDetails.module.course.author, user?.id);
            console.log(data.lessonDetails.module.course.author === user?.id);
            if (data.lessonDetails.module.course.author === user?.id) {
              push(`${myLessonViewPagesPath}/${lessonId}`);
              console.log(`${myLessonViewPagesPath}/${lessonId}`);
            } else {
              setLessonDetails(data.lessonDetails);
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

  console.log(lessonDetails);

  return <Paper elevation={0}>Lesson view page: {lessonId}</Paper>;
};

export default LessonViewPage;
