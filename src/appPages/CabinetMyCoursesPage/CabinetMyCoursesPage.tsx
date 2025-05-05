import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { createCoursePagePath } from "@/shared/variables/pagePaths";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getMyCourses } from "@/appPages/CabinetMyCoursesPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import CoursesHolderAccordion from "@/shared/components/CoursesHolderAccordion";
import { AddRounded } from "@mui/icons-material";

const CabinetMyCoursesPage = () => {
  const { push } = useRouter();
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [myCourses, setMyCourses] = useState<Course[]>([]);

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
      <CoursesHolderAccordion courses={myCourses} accordionTitle="Active" />
      <CoursesHolderAccordion courses={myCourses} accordionTitle="Drafts" />
      <CoursesHolderAccordion courses={myCourses} accordionTitle="Checking" />
    </Box>
  );
};

export default CabinetMyCoursesPage;
