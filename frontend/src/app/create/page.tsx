"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useCampanhaContext } from "../../context/CampanhasContext";

const CreateCampaign = () => {
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("ativa");
  const [categoria, setCategoria] = useState("");
  const { isBackendAvailable, addCampanha } = useCampanhaContext();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const novaCampanha = {
      nome,
      dataInicio,
      dataFim,
      status,
      categoria,
    };

    if (isBackendAvailable) {
      try {
        await axios.post("http://localhost:3001/campanhas", novaCampanha);
        router.push("/");
      } catch (error) {
        console.error("Error creating campaign:", error);
      }
    } else {
      const campanhaComId = { id: Date.now(), ...novaCampanha };
      addCampanha(campanhaComId);
      router.push("/");
    }
  };

  const handleDataInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setDataInicio(newStartDate);

    if (newStartDate > dataFim) {
      setDataFim("");
    }
  };

  const handleDataFimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setDataFim(newEndDate);
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
              Create Campaign
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
                    onChange={handleDataInicioChange}
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
                    onChange={handleDataFimChange}
                    fullWidth
                    margin="none"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: dataInicio,
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
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="ativa">ATIVA</option>
                    <option value="pausada">PAUSADA</option>
                    <option value="expirada">EXPIRADA</option>
                  </TextField>
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
                <Grid
                  item
                  xs={12}
                  p={0}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Box mt={1} display="flex" justifyContent="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => router.push("/")}
                      sx={{
                        width: "12rem",
                        borderRadius: "2rem",
                        fontSize: "1.2rem",
                        height: "3rem",
                      }}
                    >
                      Back to List
                    </Button>
                  </Box>
                  <Box mt={1} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        width: "12rem",
                        borderRadius: "2rem",
                        fontSize: "1.2rem",
                        height: "3rem",
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CreateCampaign;
