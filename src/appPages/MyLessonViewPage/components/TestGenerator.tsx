import { Button, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import {
  generateTestForLesson,
  getLessonTest,
} from "@/appPages/MyLessonViewPage/scripts";
import LessonTest from "@/appPages/MyLessonViewPage/components/LessonTest";
import { Test } from "@/shared/utils/types";

const TestGenerator: FC = () => {
  const { query } = useRouter();
  const { lessonId } = query;
  const { isLoading, setLoading } = useLoading();
  const [lessonTest, setLessonTest] = useState<Test | null>();
  const { showSnackbar } = useSnackbar();

  function handleGenerateTest() {
    setLoading(true);

    generateTestForLesson(Number(lessonId))
      .then((data) => {
        if (data.ok) {
          showSnackbar(data["success"] ?? "Successfully generated.", "success");
          fetchLessonTest();
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error test generation",
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

  async function fetchLessonTest() {
    if (!!lessonId) {
      setLoading(true);

      getLessonTest(Number(lessonId))
        .then((data) => {
          if (data.ok) {
            setLessonTest(data.lessonTest);
          } else {
            showSnackbar(
              data["error"] ??
                data["detail"] ??
                data["message"] ??
                "Failed to get lesson test",
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
    fetchLessonTest();
  }, [lessonId]);

  console.log(lessonTest);

  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: "#F4F4F8", padding: 2, borderRadius: 4 }}
    >
      <Typography variant="h6">Test Generator</Typography>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleGenerateTest}
      >
        {isLoading ? "Loading..." : "Generate Test"}
      </Button>
      {!!lessonTest && lessonTest.questions.length > 0 && (
        <LessonTest lessonTest={lessonTest} />
      )}
    </Paper>
  );
};

export default TestGenerator;
