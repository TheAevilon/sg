import { Baloo_Bhai_2, Sirin_Stencil } from "next/font/google";
import "./globals.css";
import Bg from "./dashboard/components/bg";
import { AudioProvider } from "./dashboard/components/AudioContext";
const sirinStencil = Sirin_Stencil({
  variable: "--font-sirin-stencil",
  subsets: ["latin"],
  weight: "400",
});

const balooBhai2 = Baloo_Bhai_2({
  variable: "--font-baloo-bhai-2",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "SG",
  description: "empty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${balooBhai2.variable} ${sirinStencil.variable} antialiased`}
      >
        <AudioProvider>
          <Bg />
          {children}
        </AudioProvider>
      </body>
    </html >
  );
}
