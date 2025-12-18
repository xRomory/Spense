import type { Metadata } from "next";
import { Khula, Koulen, BBH_Sans_Bogle } from "next/font/google";
import "@/styles/globals.css";

// Google Fonts
const khula = Khula({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-khula",
  display: "swap",
});

const koulen = Koulen({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-koulen",
  display: "swap",
});

const logo = BBH_Sans_Bogle({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spense",
  description: "Split expenses and track balances with friends",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html 
      lang="en"
      className={`${khula.variable} ${koulen.variable} ${logo.variable} font-khula`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
