"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import axios from "axios";
import { Campanha } from "../../../types/campanha";
import { useCampanhaContext } from "../../../context/CampanhasContext";

const EditCampaign = () => {
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("ATIVA");
  const [categoria, setCategoria] = useState("");
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);
  const router = useRouter();
  const { id } = useParams();
  const { campanhas, isBackendAvailable, updateCampanha } =
    useCampanhaContext();

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id, isBackendAvailable]);

  const fetchCampaign = async () => {
    if (isBackendAvailable) {
      try {
        const response = await axios.get<Campanha>(
          `http://localhost:3000/campanhas/${id}`
        );
        const { nome, dataInicio, dataFim, status, categoria } = response.data;
        setNome(nome);
        setDataInicio(dataInicio);
        setDataFim(dataFim);
        setStatus(status);
        setCategoria(categoria);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    } else {
      const localCampaign = campanhas.find(
        (campanha) => campanha.id === parseInt(id as string)
      );
      if (localCampaign) {
        setNome(localCampaign.nome);
        setDataInicio(localCampaign.dataInicio);
        setDataFim(localCampaign.dataFim);
        setStatus(localCampaign.status);
        setCategoria(localCampaign.categoria);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedCampaign = {
      id: parseInt(id as string),
      nome,
      dataInicio,
      dataFim,
      status,
      categoria,
    };

    try {
      if (isBackendAvailable) {
        await axios.patch(
          `http://localhost:3000/campanhas/${id}`,
          updatedCampaign
        );
      } else {
        updateCampanha(updatedCampaign);
      }
      setModalMessage("Campaign updated successfully!");
      setModalSuccess(true);
      setOpen(true);
    } catch (error) {
      console.error("Error updating campaign:", error);
      setModalMessage("Failed to update campaign. Please try again.");
      setModalSuccess(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (modalSuccess) {
      router.push("/");
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card raised sx={{ borderRadius: "2rem", minHeight: "80vh" }}>
          <CardContent sx={{ padding: "2rem", paddingBottom: "3rem" }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Edit Campaign
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginBottom: ".5rem" }}>
                  <TextField
                    label="Name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Start Date"
                    type="datetime-local"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    fullWidth
                    margin="none"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} p={0}>
                  <TextField
                    label="End Date"
                    type="datetime-local"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    fullWidth
                    margin="none"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} p={0}>
                  <TextField
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} p={0}>
                  <TextField
                    label="Category"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ marginTop: ".5rem" }}
                  />
                </Grid>
                <Grid item xs={12} p={0}>
                  <Box my={1} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        width: "12rem",
                        borderRadius: "2rem",
                        fontSize: "1.2rem",
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
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
              {modalMessage}
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleClose}>
                {modalSuccess ? "Go to Campaigns List" : "Close"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default EditCampaign;
