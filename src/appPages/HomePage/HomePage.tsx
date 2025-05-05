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
          height: "100vh",
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/main-page-image-1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          color: "white",
          textAlign: "left",
          padding: "100px 0px",
        }}
      >
        <Container>
          <Typography variant="h2">Welcome to EduTube</Typography>
          <Typography variant="h6">
            Educational platform, with AI features. Let&apos;s learn or create
            courses with us
          </Typography>
          {/*<Button variant="contained" color="primary" size="large">*/}
          {/*  Let&apos;s start*/}
          {/*</Button>*/}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              marginTop: 1,
              fontSize: 16,
            }}
          >
            Log in
          </Button>
        </Container>
      </Box>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('/main-page-image-2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          color: "white",
          textAlign: "left",
          padding: "100px 0px",
        }}
      >
        <Container>
          <Typography variant="h2">About us</Typography>
          <Typography variant="h6">
            Lorem ipsum dolor sit amet consectetur. A amet accumsan diam in
            massa ac. Fermentum sit amet faucibus sed nec et amet lacus. Quis
            vitae iaculis nulla interdum suspendisse tempus consequat dui erat.
            Vehicula at lobortis eu fermentum pretium.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          height: "85vh",
          backgroundImage: "url(/onlineLearning.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Our advantages
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Performance",
                text: "High page loading speed.",
              },
              {
                title: "Adaptability",
                text: "Looks perfect on all devices.",
              },
              {
                title: "Modern design",
                text: "We use the best UI practices.",
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
      </Box>
    </>
  );
};

export default HomePage;
