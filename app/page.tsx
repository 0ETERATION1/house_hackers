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
  const [sliderValue, setSliderValue] = useState(2.5); // Initial value set to middle

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
        <h2>Map Data</h2>
        <p>This section will contain data about the map.</p>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <p>Slider value: {sliderValue}</p>
        </div>
      </div>
    </main>
  );
}
