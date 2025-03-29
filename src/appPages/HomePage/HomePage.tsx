import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: "60vh",
          backgroundImage: "url('/onlineLearning.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2">Welcome!</Typography>
          <Typography variant="h5" color="brown">
            EduTube educational platform
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Let&apos;s start
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Наши преимущества
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Быстродействие",
              text: "Высокая скорость загрузки страниц.",
            },
            {
              title: "Адаптивность",
              text: "Идеально смотрится на всех устройствах.",
            },
            {
              title: "Современный дизайн",
              text: "Используем лучшие UI-практики.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography variant="body1">{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
