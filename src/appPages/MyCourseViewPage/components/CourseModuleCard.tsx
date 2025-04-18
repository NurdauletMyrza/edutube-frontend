import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createLessonInput, Module } from "@/shared/utils/types";
import { ExpandMoreRounded, MenuBookRounded } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import CModal from "@/shared/components/CModal";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { createLesson } from "@/appPages/MyCourseViewPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";

type CourseModuleCardProps = Module & {
  refetchCourseDetails: () => void;
};

const CourseModuleCard = ({
  refetchCourseDetails,
  ...module
}: CourseModuleCardProps) => {
  const { setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [isLessonCreateModalOpen, setLessonCreateModalOpen] =
    useState<boolean>(false);
  const [lessonFormData, setLessonFormData] = useState<createLessonInput>({
    module: Number(module.id),
    title: "",
    content: "",
    order: module.lessons.length + 1,
  });

  function handleCloseLessonCreateModal() {
    setLessonCreateModalOpen(false);
  }

  function handleConfirmLessonCreateModal() {
    setLoading(true);

    createLesson(lessonFormData)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Successfully created lesson",
            "success"
          );
          refetchCourseDetails();
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error creating lesson",
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

  function handleChangeLessonFormData(event: ChangeEvent<HTMLInputElement>) {
    setLessonFormData({
      ...lessonFormData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {module.title}
      </Typography>
      <Typography variant="body1" component="p" mb={2}>
        {module.description}
      </Typography>
      {module.lessons.map((lesson) => (
        <Accordion key={lesson.id}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography variant="h6">{lesson.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{lesson.content}</AccordionDetails>
        </Accordion>
      ))}
      <Button
        fullWidth
        startIcon={<MenuBookRounded />}
        sx={{ mt: 4 }}
        onClick={() => setLessonCreateModalOpen(true)}
      >
        Add new lesson
      </Button>
      <CModal
        open={isLessonCreateModalOpen}
        onClose={handleCloseLessonCreateModal}
        onConfirm={handleConfirmLessonCreateModal}
        title="New lesson create form"
        confirmButtonName="Create"
        closeButtonName="Cancel"
      >
        <TextField
          margin="normal"
          label="Lesson title"
          name="title"
          type="text"
          value={lessonFormData.title}
          onChange={handleChangeLessonFormData}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Lesson content"
          name="content"
          type="text"
          value={lessonFormData.content}
          onChange={handleChangeLessonFormData}
          fullWidth
          required
        />
      </CModal>
    </Paper>
  );
};

export default CourseModuleCard;
