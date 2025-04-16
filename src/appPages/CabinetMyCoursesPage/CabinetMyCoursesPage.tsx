import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { createCoursePagePath } from "@/shared/variables/pagePaths";
import { useEffect, useState } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getMyCourses } from "@/appPages/CabinetMyCoursesPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course } from "@/shared/utils/types";

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
    <Box>
      Cabinet my courses
      <Button onClick={() => push(createCoursePagePath)}>Create course</Button>
      <Grid container spacing={3} padding={2}>
        {myCourses.map((myCourse) => (
          <Grid item xs={12} sm={6} md={4} key={myCourse.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {myCourse.title}
                </Typography>
                <Typography variant="body2" whiteSpace="pre-line">
                  {myCourse.description}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ marginTop: 1, color: "gray" }}
                >
                  Created at: {new Date(myCourse.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CabinetMyCoursesPage;
