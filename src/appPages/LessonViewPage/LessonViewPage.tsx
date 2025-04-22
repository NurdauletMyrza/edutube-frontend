import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonDetails, getLessonFiles } from "@/shared/utils/apiScripts";
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
  const [lessonFiles, setLessonFiles] = useState([]);

  async function fetchLessonDetails() {
    if (!!Number(lessonId) && !!user) {
      setLoading(true);

      getLessonDetails(Number(lessonId))
        .then((data) => {
          if (data.ok) {
            if (data.lessonDetails.module.course.author === user?.id) {
              push(`${myLessonViewPagesPath}/${lessonId}`);
              // return;
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

      setLoading(true);

      getLessonFiles(Number(lessonId))
        .then((data) => {
          if (data.ok) {
            setLessonFiles(data.lessonFiles);
          } else {
            showSnackbar(
              data["error"] ??
                data["detail"] ??
                data["message"] ??
                "Failed to get lesson files",
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

  console.log(lessonDetails, lessonFiles);

  return <Paper elevation={0}>Lesson view page: {lessonId}</Paper>;
};

export default LessonViewPage;
