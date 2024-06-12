"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import Link from "next/link";
import { ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";
import { useCampanhaContext } from "@/context/CampanhasContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

const Home = () => {
  const { campanhas, fetchCampanhas, deleteCampanha } = useCampanhaContext();
  const [open, setOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (campanhas.length === 0) {
      fetchCampanhas();
    }
  }, [campanhas, fetchCampanhas]);

  const handleCardClick = (id: number) => {
    router.push(`/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCampaignId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCampaignId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedCampaignId !== null) {
      deleteCampanha(selectedCampaignId);
    }
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Card
            raised
            sx={{
              minHeight: "80vh",
              width: "100%",
              maxWidth: "xl",
              borderRadius: "2rem",
              marginY: '2rem'
            }}
          >
            <CardContent sx={{ padding: "2rem", paddingBottom: "3rem" }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
              >
                Campaigns
              </Typography>
              <Box display="flex" justifyContent="center" mb={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/create"
                  sx={{
                    borderRadius: "2rem",
                    fontSize: "1.2rem",
                  }}
                >
                  Create Campaign
                </Button>
              </Box>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                {campanhas.map((campanha) => (
                  <Grid item key={campanha.id} xs={12} sx={{ width: "100%" }}>
                    <Card
                      onClick={() => handleCardClick(campanha.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6">{campanha.nome}</Typography>
                        <Typography color="textSecondary">
                          {new Date(campanha.dataInicio).toLocaleDateString()} -{" "}
                          {new Date(campanha.dataFim).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          {campanha.status}
                        </Typography>
                        <Typography variant="body2">
                          {campanha.categoria}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          width: "100%",
                          pr: 2,
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking on actions
                      >
                        <Link href={`/${campanha.id}`} passHref>
                          <IconButton size="large" color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                        <Link href={`/edit/${campanha.id}`} passHref>
                          <IconButton size="large" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          size="large"
                          color="secondary"
                          onClick={() => handleDeleteClick(campanha.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Are you sure you want to delete this campaign?
            </Typography>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default Home;
