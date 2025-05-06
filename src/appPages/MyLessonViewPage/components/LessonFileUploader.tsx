import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  LinearProgress,
  Typography,
  Input,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  deleteLessonFile,
  getLessonFileUploadUrl,
  saveLessonFile,
} from "@/appPages/MyLessonViewPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonFiles } from "@/shared/utils/apiScripts";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { LessonFile } from "@/shared/utils/types";
import { DeleteRounded } from "@mui/icons-material";

const LessonFileUploader = ({ lessonId }: { lessonId: number }) => {
  const { showSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lessonFiles, setLessonFiles] = useState<LessonFile[]>([]);
  const { setLoading } = useLoading();

  function handleDeleteFile(lessonFileId: number) {
    setLoading(true);

    deleteLessonFile(lessonFileId)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Successfully deleted lesson file",
            "success"
          );
          fetchLessonFiles();
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Error delete lesson file",
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

  async function fetchLessonFiles() {
    if (!!lessonId) {
      setLoading(true);

      getLessonFiles(lessonId)
        .then((data) => {
          if (data.ok) {
            setLessonFiles(data.lessonFiles);
          } else {
            showSnackbar(
              data["error"] ??
                data["detail"] ??
                data["message"] ??
                "Failed to get lesson files",
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
    fetchLessonFiles();
  }, [file]);

  console.log(lessonFiles);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  async function handleFileUpload() {
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Получаем upload URL и fileId
      const uploadUrlResponse = await getLessonFileUploadUrl(
        `lesson-${lessonId}-${file.name}`,
        file.type
      );

      if (!uploadUrlResponse.ok) {
        throw new Error(
          uploadUrlResponse["error"] ??
            uploadUrlResponse["detail"] ??
            uploadUrlResponse["message"] ??
            "Failed to get upload url"
        );
      }

      const { upload_url, fileId } = uploadUrlResponse.uploadUrlData;

      console.log(uploadUrlResponse);

      // 2. Загружаем файл на Google Drive
      await fetch(upload_url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          "Content-Length": file.size.toString(),
        },
        body: file,
      }).catch((error) => {
        console.log(error);
      });

      // 3. Сохраняем метаинформацию
      const saveLessonFileResponse = await saveLessonFile(
        lessonId,
        fileId,
        file.name
      );

      if (saveLessonFileResponse.ok) {
        showSnackbar("Successfully uploaded lesson file", "success");
      } else {
        throw new Error(
          saveLessonFileResponse["error"] ??
            saveLessonFileResponse["detail"] ??
            saveLessonFileResponse["message"] ??
            "Failed to save file"
        );
      }

      setFile(null);
    } catch (error) {
      console.log(error);
      showSnackbar("Uploading error", "error");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        backgroundColor: "#F4F4F8",
        borderRadius: 4,
      }}
    >
      <Typography variant="h6">File Manager</Typography>

      <Grid container spacing={3}>
        {lessonFiles.map((file) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
            <Card
              variant="outlined"
              sx={{ height: "100%", position: "relative" }}
            >
              <CardHeader
                avatar={<FilePresentIcon color="primary" />}
                title={file.filename}
                subheader={`Uploaded ${new Date(file.uploaded_at)} ago`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>File ID:</strong> {file.file_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Lesson ID:</strong> {file.lesson}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleDeleteFile(file.id)}>
                  <DeleteRounded />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6">File Uploader</Typography>

      <Input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        sx={{ display: "none" }}
      />
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            height: 150,
            borderStyle: "dashed",
            color: "#888",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <CloudUploadIcon fontSize="large" />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Click for upload
          </Typography>
        </Card>
      </label>

      {file && (
        <Typography variant="body2" color="textSecondary">
          Selected file: {file.name}
        </Typography>
      )}

      {isUploading && <LinearProgress />}

      {/*{error && <Alert severity="error">{error}</Alert>}*/}
      {/*{success && <Alert severity="success">Файл успешно загружен!</Alert>}*/}

      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!file || isUploading}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    </Paper>
  );
};

export default LessonFileUploader;
