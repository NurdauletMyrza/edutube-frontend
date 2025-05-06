import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Test } from "@/shared/utils/types";

type Props = {
  lessonTest: Test;
};

const LessonTest: React.FC<Props> = ({ lessonTest }) => {
  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Test for Lesson #{lessonTest.lesson}
      </Typography>

      {lessonTest.questions.map((question, index) => (
        <Card key={question.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {question.text}
            </Typography>
            <List>
              {question.options.map((option) => (
                <ListItem
                  key={option.id}
                  sx={{
                    backgroundColor: option.is_correct ? "#e8f5e9" : "#f5f5f5",
                    borderLeft: option.is_correct
                      ? "5px solid #4caf50"
                      : "5px solid transparent",
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={option.text}
                    primaryTypographyProps={{
                      color: option.is_correct ? "green" : "textPrimary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LessonTest;
