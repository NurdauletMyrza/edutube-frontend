import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Course } from "@/shared/utils/types";
import { useRouter } from "next/router";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import {
  courseViewPagesPath,
  myCourseViewPagesPath,
} from "@/shared/variables/pagePaths";
import { PersonOutlineRounded, PlayArrowRounded } from "@mui/icons-material";

const CourseCard = ({ course }: { course: Course }) => {
  const { push } = useRouter();
  const { user } = useAuth();

  return (
    <Card
      onClick={() =>
        push(
          `${user?.id === course.author ? myCourseViewPagesPath : courseViewPagesPath}/${course.id}`
        )
      }
      sx={{
        backgroundImage: "url(/AI-image.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexGrow: 1,
        flex: "1 1 230px",
        maxWidth: "320px",
        minWidth: "200px",
        height: "127px",
        cursor: "pointer",
        borderRadius: 2,
        boxShadow: 1,
        padding: "13px 6px 5px 15px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: 0,
          margin: 0,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          lineHeight="20px"
          fontSize="16px"
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          fontWeight="500"
          fontSize="13px"
          lineHeight="17px"
        >
          {course.author_first_name} {course.author_last_name}
        </Typography>
      </CardContent>
      <Box display="flex" alignItems="center">
        <Typography
          color="textSecondary"
          paddingX={1}
          fontSize="9px"
          marginRight="8px"
          sx={{
            backgroundColor: "white",
            borderRadius: "7px",
            lineHeight: "14px",
          }}
        >
          beginner
        </Typography>
        <PersonOutlineRounded sx={{ fontSize: "14px" }} />
        <Typography fontSize="10px">{course.id}</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "5px",
          right: "6px",
          width: "28px",
          height: "28px",
          backgroundColor: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlayArrowRounded color="primary" />
      </Box>
    </Card>
  );
};

export default CourseCard;
