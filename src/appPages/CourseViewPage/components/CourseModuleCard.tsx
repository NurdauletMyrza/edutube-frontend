import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import { Module } from "@/shared/utils/types";
import { ExpandMoreRounded } from "@mui/icons-material";

const CourseModuleCard = (module: Module) => {
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
    </Paper>
  );
};

export default CourseModuleCard;
