"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapComponent.module.css";

// Import the GeoJSON file
import fairfaxZipCodes from "../data/fairfax_zip_codes.geojson";

// Set the access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [hoveredZipCode, setHoveredZipCode] = useState<string | null>(null);

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
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#627BC1",
            "#627BC1",
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
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

export default MapComponent;
