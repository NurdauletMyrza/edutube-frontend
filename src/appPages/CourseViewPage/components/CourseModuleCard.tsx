import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Module } from "@/shared/utils/types";
import { ExpandMoreRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { lessonViewPagesPath } from "@/shared/variables/pagePaths";

const CourseModuleCard = (module: Module) => {
  const { push } = useRouter();

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
          <AccordionActions>
            <Button onClick={() => push(`${lessonViewPagesPath}/${lesson.id}`)}>
              View details
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Paper>
  );
};

export default CourseModuleCard;
