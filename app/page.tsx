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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <MapComponent />
    </main>
  );
}
