import React from "react";
import { Card, CardContent, Typography, Grid, CardHeader } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { LessonFile } from "@/shared/utils/types";

const LessonFilesGrid = ({ files }: { files: LessonFile[] }) => {
  return (
    <Grid container spacing={3}>
      {files.map((file) => (
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LessonFilesGrid;
