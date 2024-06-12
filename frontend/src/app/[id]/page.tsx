"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { Campanha } from "../../types/campanha";
import { useCampanhaContext } from "../../context/CampanhasContext";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState<Campanha | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const { campanhas, isBackendAvailable } = useCampanhaContext();

  useEffect(() => {
    const fetchCampaign = async () => {
      if (isBackendAvailable) {
        try {
          const response = await axios.get(
            `http://localhost:3001/campanhas/${id}`
          );
          setCampaign(response.data);
        } catch (error) {
          console.error("Error fetching campaign details:", error);
        }
      } else {
        const localCampaign = campanhas.find(
          (campanha) => campanha.id === parseInt(id as string)
        );
        setCampaign(localCampaign || null);
      }
      setLoading(false);
    };

    if (id) {
      fetchCampaign();
    }
  }, [id, isBackendAvailable, campanhas]);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h5">Campaign not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card raised sx={{ borderRadius: "2rem", minHeight: "80vh" }}>
          <CardContent
            sx={{
              minHeight: "80vh",
              padding: "2rem",
              paddingBottom: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Campaign Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Name:</strong> {campaign.nome}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Start Date:</strong>{" "}
                  {new Date(campaign.dataInicio).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>End Date:</strong>{" "}
                  {new Date(campaign.dataFim).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Status:</strong> {campaign.status}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Category:</strong> {campaign.categoria}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/")}
                sx={{
                  width: "12rem",
                  borderRadius: "2rem",
                  fontSize: "1.2rem",
                }}
              >
                Back to List
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CampaignDetails;
