"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapComponent.module.css";

// Import the GeoJSON file
import fairfaxZipCodes from "../data/fairfax_zip_codes.geojson";

// Set the access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface MapComponentProps {
  schoolRating: number;
  numHospitals: number;
  avgHomePrice: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  schoolRating,
  numHospitals,
  avgHomePrice,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to interpolate between colors
  const getColor = (value: number) => {
    const red = [255, 0, 0];
    const yellow = [255, 255, 0];
    const green = [0, 255, 0];

    let colorComponents;
    if (value <= 50) {
      const ratio = value / 50;
      colorComponents = red.map((comp, i) =>
        Math.round(comp + ratio * (yellow[i] - comp))
      );
    } else {
      const ratio = (value - 50) / 50;
      colorComponents = yellow.map((comp, i) =>
        Math.round(comp + ratio * (green[i] - comp))
      );
    }

    return `rgb(${colorComponents[0]}, ${colorComponents[1]}, ${colorComponents[2]})`;
  };

  // Function to update map style
  const updateMapStyle = () => {
    const map = mapRef.current;
    if (map && mapLoaded && map.getLayer("zip-codes-fill")) {
      // Normalize the values to a 0-100 scale
      const normalizedSchoolRating = ((schoolRating - 1) / 9) * 100;
      const normalizedNumHospitals = (numHospitals / 5) * 100;
      const normalizedAvgHomePrice = ((avgHomePrice - 200000) / 800000) * 100;

      // Calculate an overall score (you can adjust the weights as needed)
      const overallScore =
        (normalizedSchoolRating +
          normalizedNumHospitals +
          normalizedAvgHomePrice) /
        3;

      const color = getColor(overallScore);

      // Update only the fill-color property
      map.setPaintProperty("zip-codes-fill", "fill-color", color);
    }
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-77.2, 38.9],
      zoom: 10,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("fairfax-zip-codes", {
        type: "geojson",
        data: fairfaxZipCodes,
      });

      map.addLayer({
        id: "zip-codes-fill",
        type: "fill",
        source: "fairfax-zip-codes",
        paint: {
          "fill-color": "#627BC1", // Initial color
          "fill-opacity": 0.5,
          "fill-color-transition": { duration: 300 },
        },
      });

      map.addLayer({
        id: "zip-codes-outline",
        type: "line",
        source: "fairfax-zip-codes",
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });

      map.addLayer({
        id: "zip-codes-labels",
        type: "symbol",
        source: "fairfax-zip-codes",
        layout: {
          "text-field": ["get", "ZIPCODE"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 1,
        },
      });

      setMapLoaded(true);
      updateMapStyle(); // Apply initial style based on the current slider values
    });

    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Update map style when props change
  useEffect(() => {
    updateMapStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolRating, numHospitals, avgHomePrice]);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

MapComponent.displayName = "MapComponent";

export default MapComponent;
