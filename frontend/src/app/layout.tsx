import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import { CampanhaProvider } from "@/context/CampanhasContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mamba - Braian Test",
  description: "Creating a Campanha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: "lightgray" }}
      >
        <CssBaseline />
        <CampanhaProvider>{children}</CampanhaProvider>
      </body>
    </html>
  );
}
