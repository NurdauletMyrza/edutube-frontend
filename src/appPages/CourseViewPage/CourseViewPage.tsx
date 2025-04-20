import { useRouter } from "next/router";
import { Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import { getCourseDetails } from "@/shared/utils/apiScripts";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { myCourseViewPagesPath } from "@/shared/variables/pagePaths";
import CourseModuleCard from "@/appPages/CourseViewPage/components/CourseModuleCard";

const CourseViewPage = () => {
  const { push, query } = useRouter();
  const { user } = useAuth();
  const { courseId } = query;
  const { isLoading, setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [courseDetails, setCourseDetails] = useState<Course>();

  useEffect(() => {
    if (!!Number(courseId) && !!user) {
      setLoading(true);

      getCourseDetails(Number(courseId))
        .then((data) => {
          if (data.ok) {
            if (data.courseDetails.author === user?.id) {
              push(`${myCourseViewPagesPath}/${courseId}`);
            } else {
              setCourseDetails(data.courseDetails);
            }
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
    }
  }, [courseId, user]);

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="body1">Loading course details...</Typography>
      </Paper>
    );
  } else if (!courseDetails) {
    return (
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="body1">Not found</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {courseDetails.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          AuthorID: {courseDetails.author}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Created at: {new Date(courseDetails.created_at).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" whiteSpace="pre-line">
          {courseDetails.description}
        </Typography>
      </Paper>
      {courseDetails.modules.map((module) => (
        <CourseModuleCard {...module} key={module.id} />
      ))}
    </>
  );
};

export default CourseViewPage;
