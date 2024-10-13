"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import TopZipCodes from "./components/TopZipCodes";

interface ZipCodeData {
  ZIPCODE: string;
  ZIPCITY: string;
  SchoolRating: number;
  NumHospitals: number;
  AvgHomePrice: number;
  Population: number;
  UnitsAvailable: number;
}

const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map component...</div>,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [schoolRating, setSchoolRating] = useState(5);
  const [numHospitals, setNumHospitals] = useState(2);
  const [avgHomePrice, setAvgHomePrice] = useState(500000);
  const [population, setPopulation] = useState(50000);
  const [unitsAvailable, setUnitsAvailable] = useState(1000);
  const [topZipCodes, setTopZipCodes] = useState<ZipCodeData[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.mapSection}>
        <MapComponent topZipCodes={topZipCodes} />
      </div>
      <div className={styles.dataSection}>
        <h2>Map Data</h2>
        <p>Adjust the sliders to filter the map data.</p>

        <div className={styles.sliderContainer}>
          <label htmlFor="schoolRating">School Rating (1-10):</label>
          <input
            type="range"
            id="schoolRating"
            min="2.6"
            max="9"
            step="0.1"
            value={schoolRating}
            onChange={(e) => setSchoolRating(parseFloat(e.target.value))}
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
            max="4"
            step="1"
            value={numHospitals}
            onChange={(e) => setNumHospitals(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Number of Hospitals: {numHospitals}</p>
        </div>

        <div className={styles.sliderContainer}>
          <label htmlFor="avgHomePrice">
            Average Home Price ($200,000 - $2,000,000):
          </label>
          <input
            type="range"
            id="avgHomePrice"
            min="286667"
            max="1567004"
            step="10000"
            value={avgHomePrice}
            onChange={(e) => setAvgHomePrice(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Average Home Price: ${avgHomePrice.toLocaleString()}</p>
        </div>

        <div className={styles.sliderContainer}>
          <label htmlFor="population">Population (0 - 100,000):</label>
          <input
            type="range"
            id="population"
            min="0"
            max="58404"
            step="1000"
            value={population}
            onChange={(e) => setPopulation(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Population: {population.toLocaleString()}</p>
        </div>

        <div className={styles.sliderContainer}>
          <label htmlFor="unitsAvailable">Units Available (0 - 5,000):</label>
          <input
            type="range"
            id="unitsAvailable"
            min="0"
            max="10720"
            step="100"
            value={unitsAvailable}
            onChange={(e) => setUnitsAvailable(parseInt(e.target.value))}
            className={styles.slider}
          />
          <p>Units Available: {unitsAvailable.toLocaleString()}</p>
        </div>

        <TopZipCodes
          schoolRating={schoolRating}
          numHospitals={numHospitals}
          avgHomePrice={avgHomePrice}
          population={population}
          unitsAvailable={unitsAvailable}
          onTopZipCodesChange={setTopZipCodes}
        />
      </div>
    </main>
  );
}
