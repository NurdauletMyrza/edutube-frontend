import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import {
  generateTestForLesson,
  getLessonTest,
  getLessonTestStatus,
} from "@/appPages/MyLessonViewPage/scripts";
import LessonTest from "@/appPages/MyLessonViewPage/components/LessonTest";
import { Test } from "@/shared/utils/types";

const TestGenerator: FC = () => {
  const { query } = useRouter();
  const { lessonId } = query;
  const { setLoading } = useLoading();
  const [lessonTest, setLessonTest] = useState<Test | null>();
  const { showSnackbar } = useSnackbar();
  const [isGeneratingTest, setGeneratingTest] = useState<boolean>(!!lessonTest);
  const [testStatus, setTestStatus] = useState<string>();

  function handleGenerateTest() {
    setLoading(true);

    generateTestForLesson(Number(lessonId))
      .then((data) => {
        if (data.ok) {
          showSnackbar(data["success"] ?? "Successfully running", "success");
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

  const pollTestStatus = async () => {
    setGeneratingTest(true);

    if (!!lessonId) {
      const testStatusInterval = setInterval(async () => {
        getLessonTestStatus(Number(lessonId))
          .then((data) => {
            if (data.ok) {
              if (!data.is_generating) {
                clearInterval(testStatusInterval);
                showSnackbar("Test generate successfully", "success");
                setGeneratingTest(false);
                setTestStatus(undefined);
                fetchLessonTest();
              } else {
                setTestStatus(data.status);
              }
            } else {
              clearInterval(testStatusInterval);
              setGeneratingTest(false);

              showSnackbar(
                data["error"] ??
                  data["detail"] ??
                  data["message"] ??
                  "Failed to get test status",
                "error"
              );
            }
          })
          .catch((error) => {
            clearInterval(testStatusInterval);
            setGeneratingTest(false);
            showSnackbar(error, "error");
          })
          .finally(() => setLoading(false));
      }, 3000);
    }
  };

  async function fetchLessonTest() {
    if (!!lessonId) {
      setLoading(true);

      getLessonTest(Number(lessonId))
        .then((data) => {
          if (data.ok) {
            if (data.lessonTest.is_generating) {
              pollTestStatus();
            } else {
              setLessonTest(data.lessonTest);
            }
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

  useEffect(() => {
    setGeneratingTest(lessonTest?.is_generating ?? false);
  }, [lessonTest]);

  console.log(lessonTest);

  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: "#F4F4F8", padding: 2, borderRadius: 4 }}
    >
      <Typography variant="h6">Test Generator</Typography>
      <Button
        variant="contained"
        onClick={handleGenerateTest}
        disabled={isGeneratingTest}
      >
        {isGeneratingTest ? "Generating..." : "Generate Test"}
      </Button>
      <Typography variant="body2">{testStatus}</Typography>
      {isGeneratingTest && <LinearProgress />}
      {!!lessonTest && lessonTest.questions.length > 0 && (
        <LessonTest lessonTest={lessonTest} />
      )}
    </Paper>
  );
};

export default TestGenerator;
