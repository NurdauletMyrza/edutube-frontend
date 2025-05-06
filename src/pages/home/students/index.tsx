// appPages/ForStudentsPage/ForStudentsPage.tsx

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const mockStudentFeatures = [
  {
    title: "Learn at Your Own Pace",
    description:
      "Access course materials anytime and anywhere. Rewatch lessons and review notes at your convenience.",
    image: "/images/student-flexibility.png",
  },
  {
    title: "Instant Quizzes",
    description:
      "Test your understanding immediately with AI-generated quizzes after each lesson.",
    image: "/images/student-quiz.png",
  },
  {
    title: "Track Your Progress",
    description:
      "Stay motivated by tracking your progress across modules and courses.",
    image: "/images/student-progress.png",
  },
  {
    title: "All Resources in One Place",
    description:
      "Access all lesson videos, PDFs, and links in a centralized dashboard.",
    image: "/images/student-resources.png",
  },
];

export default function ForStudentsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight={600} textAlign="center">
        For Students
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={5}>
        Unlock your learning potential with tools designed to keep you engaged
        and on track.
      </Typography>

      <Grid container spacing={4}>
        {mockStudentFeatures.map((feature, index) => (
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
          Start Learning Today
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join EduTube to gain access to modern, AI-powered learning tools.
        </Typography>
      </Box>
    </Container>
  );
}
