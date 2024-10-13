import "./globals.css";
import { Inter } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "house_hackers",
  description: "Find Your New Home!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ margin: 0, padding: 0, height: "100%" }}>{children}</body>
    </html>
  );
}
