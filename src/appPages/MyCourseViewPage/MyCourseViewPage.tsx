import { useRouter } from "next/router";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState, ChangeEvent } from "react";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { Course, createModuleInput } from "@/shared/utils/types";
import { getCourseDetails } from "@/shared/utils/apiScripts";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import { courseViewPagesPath } from "@/shared/variables/pagePaths";
import { AddRounded } from "@mui/icons-material";
import CModal from "@/shared/components/CModal";
import { createModule } from "@/appPages/MyCourseViewPage/scripts";
import CourseModuleCard from "@/appPages/MyCourseViewPage/components/CourseModuleCard";

const MyCourseViewPage = () => {
  const { push, query } = useRouter();
  const { user } = useAuth();
  const { courseId } = query;
  const { isLoading, setLoading } = useLoading();
  const { showSnackbar } = useSnackbar();
  const [courseDetails, setCourseDetails] = useState<Course>();

  const [isModuleCreateModalOpen, setModuleCreateModalOpen] =
    useState<boolean>(false);
  const [moduleFormData, setModuleFormData] = useState<createModuleInput>({
    course: Number(courseId),
    title: "",
    description: "",
    order: courseDetails ? courseDetails.modules.length + 1 : 1,
  });

  function handleCloseModuleCreateModal() {
    setModuleCreateModalOpen(false);
  }

  function handleConfirmModuleCreateModal() {
    setLoading(true);

    createModule(moduleFormData)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Successfully created module",
            "success"
          );
          handleCloseModuleCreateModal();
          fetchCourseDetails();
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error creating module",
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

  function handleChangeModuleFormData(event: ChangeEvent<HTMLInputElement>) {
    setModuleFormData({
      ...moduleFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function fetchCourseDetails() {
    if (Number(courseId)) {
      setLoading(true);

      getCourseDetails(Number(courseId))
        .then((data) => {
          if (data.ok) {
            if (data.courseDetails.author === user?.id) {
              setCourseDetails(data.courseDetails);
            } else {
              push(`${courseViewPagesPath}/${courseId}`);
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
  }

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

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

  console.log(courseDetails);

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {courseDetails.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Author: you
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
        <CourseModuleCard
          key={module.id}
          {...module}
          refetchCourseDetails={fetchCourseDetails}
        />
      ))}
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddRounded />}
        sx={{ mt: 4 }}
        onClick={() => setModuleCreateModalOpen(true)}
      >
        Add new module
      </Button>
      {/*<Paper*/}
      {/*  elevation={3}*/}
      {/*  sx={{ p: 4, mt: 4, cursor: "pointer", textAlign: "center" }}*/}
      {/*>*/}
      {/*  <Typography variant="h5" gutterBottom>*/}
      {/*    Add new module*/}
      {/*  </Typography>*/}
      {/*</Paper>*/}
      <CModal
        open={isModuleCreateModalOpen}
        onClose={handleCloseModuleCreateModal}
        onConfirm={handleConfirmModuleCreateModal}
        title="New module create form"
        confirmButtonName="Create"
        closeButtonName="Cancel"
      >
        <TextField
          margin="normal"
          label="Module title"
          name="title"
          type="text"
          value={moduleFormData.title}
          onChange={handleChangeModuleFormData}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Module description"
          name="description"
          type="text"
          value={moduleFormData.description}
          onChange={handleChangeModuleFormData}
          fullWidth
          required
        />
      </CModal>
    </>
  );
};

export default MyCourseViewPage;
