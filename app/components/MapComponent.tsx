"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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

const getColorExpression = (
  schoolRating: number,
  numHospitals: number,
  avgHomePrice: number
) => {
  // This is a placeholder. Implement your own logic to determine colors based on the criteria
  return [
    "interpolate",
    ["linear"],
    ["get", "ZIPCODE"],
    20000,
    "#ff0000",
    30000,
    "#00ff00",
    40000,
    "#0000ff",
  ];
};

const MapComponent: React.FC<MapComponentProps> = React.memo(
  ({ schoolRating, numHospitals, avgHomePrice }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [hoveredZipCode, setHoveredZipCode] = useState<string | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const updateMapStyle = useCallback(() => {
      if (mapRef.current && mapLoaded) {
        mapRef.current.setPaintProperty("zip-codes-fill", "fill-color", [
          "interpolate",
          ["linear"],
          ["get", "value"],
          0,
          "#FF0000", // Red for low values
          50,
          "#FFFF00", // Yellow for medium values
          100,
          "#00FF00", // Green for high values
        ]);
      }
    }, [mapLoaded]);

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
        setMapLoaded(true);

        map.addSource("fairfax-zip-codes", {
          type: "geojson",
          data: fairfaxZipCodes,
        });

        map.addLayer({
          id: "zip-codes-fill",
          type: "fill",
          source: "fairfax-zip-codes",
          paint: {
            "fill-color": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              "#3A539B", // Darker blue for hovered state
              "#627BC1", // Original blue for non-hovered state
            ],
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.5,
            ],
            "fill-color-transition": { duration: 300 },
            "fill-opacity-transition": { duration: 300 },
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

        // Add a new layer for zip code labels
        map.addLayer({
          id: "zip-codes-labels",
          type: "symbol",
          source: "fairfax-zip-codes",
          layout: {
            "text-field": ["get", "ZIPCODE"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 12,
            "text-allow-overlap": false,
            "text-ignore-placement": false,
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 1,
          },
        });

        // Add hover effect
        map.on("mousemove", "zip-codes-fill", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            if (feature.properties && feature.properties.ZIPCODE) {
              const zipCode = feature.properties.ZIPCODE.toString();
              if (hoveredZipCode !== zipCode) {
                if (hoveredZipCode) {
                  map.setFeatureState(
                    { source: "fairfax-zip-codes", id: hoveredZipCode },
                    { hover: false }
                  );
                }
                map.setFeatureState(
                  { source: "fairfax-zip-codes", id: zipCode },
                  { hover: true }
                );
                setHoveredZipCode(zipCode);
              }
            }
          }
        });

        map.on("mouseleave", "zip-codes-fill", () => {
          if (hoveredZipCode) {
            map.setFeatureState(
              { source: "fairfax-zip-codes", id: hoveredZipCode },
              { hover: false }
            );
            setHoveredZipCode(null);
          }
        });

        updateMapStyle();
      });

      return () => map.remove();
    }, [updateMapStyle, hoveredZipCode]); // Added hoveredZipCode to the dependency array

    return <div ref={mapContainerRef} className={styles.mapContainer} />;
  }
);

// Add a display name to the component
MapComponent.displayName = "MapComponent";

export default MapComponent;
