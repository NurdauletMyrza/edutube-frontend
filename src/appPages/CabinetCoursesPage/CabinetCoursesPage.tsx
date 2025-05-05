import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import { getAllCourses } from "@/appPages/CabinetCoursesPage/scripts";
import CoursesHolderAccordion from "@/shared/components/CoursesHolderAccordion";
import FilterAndSearcher from "@/appPages/CabinetCoursesPage/components/FilterAndSearcher";

const CabinetCoursesPage = () => {
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setLoading(true);

    getAllCourses()
      .then((data) => {
        if (data.ok) {
          setCourses(data.courses);
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
    <Box display="flex" flexDirection="column" gap="20px" marginTop="100px">
      <Typography variant="h5">All courses list</Typography>
      <FilterAndSearcher />
      <CoursesHolderAccordion courses={courses} accordionTitle="Top Courses" />
      <CoursesHolderAccordion courses={courses} accordionTitle="New Courses" />
    </Box>
  );
};

export default CabinetCoursesPage;
