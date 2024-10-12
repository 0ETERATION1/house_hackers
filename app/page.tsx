"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

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
    <main className={styles.mainContainer}>
      <div className={styles.mapSection}>
        <MapComponent />
      </div>
      <div className={styles.dataSection}>
        {/* Add your data components here */}
        <h2>Map Data</h2>
        <p>This section will contain data about the map.</p>
      </div>
    </main>
  );
}
