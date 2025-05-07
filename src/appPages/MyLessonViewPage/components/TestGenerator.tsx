import { Button, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import {
  generateTestForLesson,
  getLessonTest,
  getTestStatus,
} from "@/appPages/MyLessonViewPage/scripts";
import LessonTest from "@/appPages/MyLessonViewPage/components/LessonTest";
import { Test } from "@/shared/utils/types";

const TestGenerator: FC = () => {
  const { query } = useRouter();
  const { lessonId } = query;
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();

  const [lessonTest, setLessonTest] = useState<Test | null>(null);
  const [testId, setTestId] = useState<number | null>(null);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);

  // Load testId from localStorage on mount
  useEffect(() => {
    const savedTestId = localStorage.getItem("generatingTestId");
    if (savedTestId) {
      setTestId(Number(savedTestId));
      setIsGeneratingTest(true);
    }
  }, []);

  // Save testId to localStorage when it changes
  useEffect(() => {
    if (testId) {
      localStorage.setItem("generatingTestId", String(testId));
      pollTestStatus(); // Start polling
    }
  }, [testId]);

  const clearTestId = () => {
    localStorage.removeItem("generatingTestId");
    setTestId(null);
    setIsGeneratingTest(false);
  };

  const handleGenerateTest = async () => {
    setLoading(true);

    try {
      const data = await generateTestForLesson(Number(lessonId));
      if (data.test_id) {
        setTestId(data.test_id);
        setIsGeneratingTest(true);
        showSnackbar("Test generation started.", "info");
      } else {
        showSnackbar(
          data.error || data.message || "Generation failed",
          "error"
        );
      }
    } catch (error) {
      showSnackbar(String(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const pollTestStatus = async () => {
    if (!testId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getTestStatus(testId);
        if (data.ok && !data.is_generating) {
          clearInterval(interval);
          clearTestId();
          fetchLessonTest(); // Refresh full test
          showSnackbar("Test generation completed.", "success");
        }
      } catch (error) {
        console.error("Polling failed:", error);
        clearInterval(interval);
        clearTestId();
        showSnackbar("Failed to check test status.", "error");
      }
    }, 10000);
  };

  const fetchLessonTest = async () => {
    if (!lessonId) return;

    setLoading(true);
    try {
      const data = await getLessonTest(Number(lessonId));
      console.log(lessonId, data);
      if (data.ok) {
        setLessonTest(data.lessonTest);

        // Если вернулся активный is_generating и testId ещё не восстановлен
        if (data.lessonTest?.is_generating && !testId) {
          setTestId(data.lessonTest.id);
          setIsGeneratingTest(true);
        }
      } else {
        showSnackbar(
          data.error || data.message || "Failed to fetch test",
          "error"
        );
      }
    } catch (error) {
      showSnackbar(String(error), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonTest();
  }, [lessonId, testId]);

  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: "#F4F4F8", padding: 2, borderRadius: 4 }}
    >
      <Typography variant="h6">Test Generator</Typography>
      <Button
        variant="contained"
        disabled={isGeneratingTest}
        onClick={handleGenerateTest}
        sx={{ mt: 2, mb: 2 }}
      >
        {isGeneratingTest ? "Generating..." : "Generate Test"}
      </Button>

      {!!lessonTest && lessonTest.questions.length > 0 && (
        <LessonTest lessonTest={lessonTest} />
      )}
    </Paper>
  );
};

export default TestGenerator;
