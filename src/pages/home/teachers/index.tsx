// appPages/ForTeachersPage/ForTeachersPage.tsx

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

const mockTeacherFeatures = [
  {
    title: "Easy Course Creation",
    description:
      "Create and manage courses with a simple and intuitive interface.",
    image: "/images/teacher-course.png",
  },
  {
    title: "Automatic Quiz Generation",
    description: "Generate quizzes from your lesson materials using AI.",
    image: "/images/teacher-quiz.png",
  },
  {
    title: "Lesson Insights",
    description: "Track student progress and get detailed lesson analytics.",
    image: "/images/teacher-analytics.png",
  },
  {
    title: "Centralized File Storage",
    description:
      "Upload and manage your lesson videos and documents in one place.",
    image: "/images/teacher-storage.png",
  },
];

export default function ForTeachersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight={600} textAlign="center">
        For Teachers
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={5}>
        Empower your teaching experience with tools built to simplify and
        enhance your educational content delivery.
      </Typography>

      <Grid container spacing={4}>
        {mockTeacherFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join EduTube and start creating engaging lessons in minutes.
        </Typography>
      </Box>
    </Container>
  );
}
