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
  const [schoolRating, setSchoolRating] = useState(1);
  const [numHospitals, setNumHospitals] = useState(0);
  const [avgHomePrice, setAvgHomePrice] = useState(200000);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.mapSection}>
        <MapComponent
          schoolRating={schoolRating}
          numHospitals={numHospitals}
          avgHomePrice={avgHomePrice}
        />
      </div>
      <div className={styles.dataSection}>
        <h2>Map Data</h2>
        <p>Adjust the sliders to filter the map data.</p>

        <div className={styles.sliderContainer}>
          <label htmlFor="schoolRating">School Rating (1-10):</label>
          <input
            type="range"
            id="schoolRating"
            min="1"
            max="10"
            step="1"
            value={schoolRating}
            onChange={(e) => setSchoolRating(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>School Rating: {schoolRating}</p>
        </div>

        <div className={styles.sliderContainer}>
          <label htmlFor="numHospitals">Number of Hospitals (0-5):</label>
          <input
            type="range"
            id="numHospitals"
            min="0"
            max="5"
            step="1"
            value={numHospitals}
            onChange={(e) => setNumHospitals(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Number of Hospitals: {numHospitals}</p>
        </div>

        <div className={styles.sliderContainer}>
          <label htmlFor="avgHomePrice">
            Average Home Price ($200,000 - $1,000,000):
          </label>
          <input
            type="range"
            id="avgHomePrice"
            min="200000"
            max="1000000"
            step="10000"
            value={avgHomePrice}
            onChange={(e) => setAvgHomePrice(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Average Home Price: ${avgHomePrice.toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
}
