import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { createCoursePagePath } from "@/shared/variables/pagePaths";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import {
  getEnrolledCourses,
  getMyCourses,
} from "@/appPages/CabinetMyCoursesPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import CoursesHolderAccordion from "@/shared/components/CoursesHolderAccordion";
import { AddRounded } from "@mui/icons-material";

const CabinetMyCoursesPage = () => {
  const { push } = useRouter();
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    setLoading(true);

    getMyCourses()
      .then((data) => {
        if (data.ok) {
          setMyCourses(data.courses);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Failed to get courses",
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

    setLoading(true);

    getEnrolledCourses()
      .then((data) => {
        if (data.ok) {
          setEnrolledCourses(data.courses);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Failed to get courses",
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
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">My courses list</Typography>
        <Button
          variant="contained"
          onClick={() => push(createCoursePagePath)}
          startIcon={<AddRounded />}
        >
          Create course
        </Button>
      </Box>
      <CoursesHolderAccordion
        courses={myCourses}
        accordionTitle="Created courses"
      />
      <CoursesHolderAccordion
        courses={enrolledCourses}
        accordionTitle="Enrolled courses"
      />
    </Box>
  );
};

export default CabinetMyCoursesPage;
