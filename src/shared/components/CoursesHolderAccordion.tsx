import React, { useState, FC } from "react";
import { Typography, Box, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Course } from "@/shared/utils/types";
import CourseCard from "@/shared/components/CourseCard";

interface Props {
  courses: Course[];
  accordionTitle: string;
}

const CoursesHolderAccordion: FC<Props> = ({ courses, accordionTitle }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        padding: "21px 25px 29px 25px",
        borderRadius: "20px",
        backgroundColor: "#F4F4F8",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          {accordionTitle}
          <ExpandMoreIcon
            onClick={() => setExpanded(!isExpanded)}
            sx={{
              cursor: "pointer",
              transform: `rotate(${isExpanded ? 180 : 0}deg)`,
            }}
          />
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {courses.length} courses
        </Typography>
      </Box>
      <Box
        display="flex"
        // justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        overflow="hidden"
        sx={{
          maxHeight: isExpanded ? "1000px" : "130px",
          transition: "max-height 1s ease",
        }}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Box>
    </Paper>
  );
};

export default CoursesHolderAccordion;
