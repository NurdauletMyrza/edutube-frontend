import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";
import { getAllCourses } from "@/appPages/CabinetCoursesPage/scripts";
import { useRouter } from "next/router";
import { courseViewPagesPath } from "@/shared/variables/pagePaths";

const CabinetCoursesPage = () => {
  const { push } = useRouter();
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
    <Box>
      Cabinet all courses
      <Grid container spacing={3} padding={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{ height: "100%", cursor: "pointer" }}
              onClick={() => push(`${courseViewPagesPath}/${course.id}`)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" whiteSpace="pre-line">
                  {course.description}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ marginTop: 1, color: "gray" }}
                >
                  Created at: {new Date(course.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CabinetCoursesPage;
