import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getLessonFileUploadUrl,
  saveLessonFile,
} from "@/appPages/MyLessonViewPage/scripts";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { getLessonFiles } from "@/shared/utils/apiScripts";

const LessonFileUploader = ({ lessonId }: { lessonId: number }) => {
  const { showSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lessonFiles, setLessonFiles] = useState([]);
  const { setLoading } = useLoading();

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
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      p={2}
      border="1px solid #ccc"
      borderRadius={2}
      bgcolor="#fafafa"
    >
      <Typography variant="h6">File Uploader</Typography>

      <Input type="file" onChange={handleFileChange} />

      {file && (
        <Typography variant="body2" color="textSecondary">
          Выбран файл: {file.name}
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
        Загрузить
      </Button>
    </Box>
  );
};

export default LessonFileUploader;
