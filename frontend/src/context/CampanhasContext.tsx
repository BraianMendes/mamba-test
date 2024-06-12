"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Campanha } from "../types/campanha";

interface CampanhaContextProps {
  campanhas: Campanha[];
  fetchCampanhas: () => void;
  deleteCampanha: (id: number) => void;
  updateCampanha: (updatedCampaign: Campanha) => void;
  addCampanha: (novaCampanha: Campanha) => void;
  isBackendAvailable: boolean;
}

const CampanhaContext = createContext<CampanhaContextProps | undefined>(
  undefined
);

const CampanhaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  useEffect(() => {
    const storedCampanhas = localStorage.getItem("campanhas");
    if (storedCampanhas) {
      setCampanhas(JSON.parse(storedCampanhas));
    }
    checkBackendConnection();
  }, []);

  useEffect(() => {
    if (campanhas.length > 0) {
      localStorage.setItem("campanhas", JSON.stringify(campanhas));
    }
  }, [campanhas]);

  const checkBackendConnection = async () => {
    try {
      await axios.get("http://localhost:3001/campanhas");
      console.log("Backend Available");
      setIsBackendAvailable(true);
      fetchCampanhas();
    } catch {
      console.log("Backend Not Available");
      setIsBackendAvailable(false);
      fetchCampanhas();
    }
  };

  const fetchCampanhas = async () => {
    if (isBackendAvailable) {
      try {
        const response = await axios.get("http://localhost:3001/campanhas");
        setCampanhas(response.data);
      } catch (error) {
        console.error("Error fetching campanhas from backend:", error);
      }
    } else if (campanhas.length === 0) {
      console.log("Fetch Campanhas setting mocked data.");
      setCampanhas([
        {
          id: 1,
          nome: "Campaign 1",
          dataInicio: "2024-06-01T00:00:00",
          dataFim: "2024-06-30T00:00:00",
          status: "ATIVA",
          categoria: "Marketing",
        },
        {
          id: 2,
          nome: "Campaign 2",
          dataInicio: "2024-07-01T00:00:00",
          dataFim: "2024-07-31T00:00:00",
          status: "PAUSADA",
          categoria: "Sales",
        },
      ]);
    }
  };

  const deleteCampanha = async (id: number) => {
    if (isBackendAvailable) {
      try {
        await axios.delete(`http://localhost:3001/campanhas/${id}`);
        setCampanhas(campanhas.filter((campanha) => campanha.id !== id));
      } catch (error) {
        console.error("Error deleting campanha:", error);
      }
    } else {
      setCampanhas(campanhas.filter((campanha) => campanha.id !== id));
    }
  };

  const updateCampanha = (updatedCampaign: Campanha) => {
    setCampanhas((prevCampanhas) =>
      prevCampanhas.map((campanha) =>
        campanha.id === updatedCampaign.id ? updatedCampaign : campanha
      )
    );
  };

  const addCampanha = (novaCampanha: Campanha) => {
    setCampanhas((prevCampanhas) => [...prevCampanhas, novaCampanha]);
  };

  return (
    <CampanhaContext.Provider
      value={{
        campanhas,
        fetchCampanhas,
        deleteCampanha,
        updateCampanha,
        addCampanha,
        isBackendAvailable,
      }}
    >
      {children}
    </CampanhaContext.Provider>
  );
};

const useCampanhaContext = () => {
  const context = useContext(CampanhaContext);
  if (context === undefined) {
    throw new Error(
      "useCampanhaContext must be used within a CampanhaProvider"
    );
  }
  return context;
};

export { CampanhaProvider, useCampanhaContext };
