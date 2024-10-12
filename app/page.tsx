"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map component...</div>,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <MapComponent />
    </main>
  );
}
