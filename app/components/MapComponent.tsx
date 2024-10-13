// app/components/MapComponent.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapComponent.module.css";

// Import the GeoJSON file
import fairfaxZipCodes from "../data/fairfax_zip_codes.geojson";

// Set the access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface ZipCodeData {
  ZIPCODE: string;
  ZIPCITY: string;
  SchoolRating: number;
  NumHospitals: number;
  AvgHomePrice: number;
}

interface MapComponentProps {
  topZipCodes: ZipCodeData[];
}

const MapComponent: React.FC<MapComponentProps> = ({ topZipCodes }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to get color based on rank
  const getColorByRank = (rank: number): string => {
    const colors = [
      [0, 255, 0], // Green for 1st place
      [173, 255, 47], // GreenYellow for 2nd place
      [255, 255, 0], // Yellow for 3rd place
      [255, 165, 0], // Orange for 4th place
      [255, 0, 0], // Red for 5th place
    ];
    const color = colors[rank] || [255, 255, 255]; // Default to white
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  // Function to update map style
  const updateMapStyle = useCallback(() => {
    const map = mapRef.current;
    if (map && mapLoaded && map.getLayer("zip-codes-fill")) {
      const matchExpression: any[] = ["match", ["get", "ZIPCODE"]];

      topZipCodes.forEach((zipcodeData, index) => {
        const zipCode = Number(zipcodeData.ZIPCODE); // Ensure data type matches GeoJSON
        matchExpression.push(zipCode, getColorByRank(index));
      });

      // Add a default color (transparent)
      matchExpression.push("rgba(0, 0, 0, 0)");

      // Update the fill-color property using the match expression
      map.setPaintProperty(
        "zip-codes-fill",
        "fill-color",
        matchExpression as mapboxgl.Expression
      );
    }
  }, [topZipCodes, mapLoaded]);

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
          "fill-color": "rgba(0, 0, 0, 0)", // Default transparent
          "fill-opacity": 0.5,
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

      // Initial style update
      updateMapStyle();
    });

    return () => {
      map.remove();
    };
  }, []); // Empty dependency array, so this runs only once on mount

  // Update map style when topZipCodes change
  useEffect(() => {
    updateMapStyle();
  }, [topZipCodes, updateMapStyle]);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

export default MapComponent;
