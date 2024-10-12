"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapComponent.module.css";

// Import the GeoJSON file
import fairfaxZipCodes from "../data/fairfax_zip_codes.geojson";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [hoveredZipCode, setHoveredZipCode] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-77.2, 38.85], // Centered on Fairfax County
      zoom: 9,
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
            "interpolate",
            ["linear"],
            ["to-number", ["get", "ZIPCODE"]],
            20000,
            "#f7fbff",
            23000,
            "#08306b",
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.6,
          ],
        },
      });

      map.addLayer({
        id: "zip-codes-outline",
        type: "line",
        source: "fairfax-zip-codes",
        paint: {
          "line-color": "#000",
          "line-width": 1,
        },
      });

      // Add hover effect
      map.on("mousemove", "zip-codes-fill", (e) => {
        if (e.features && e.features.length > 0) {
          if (hoveredZipCode !== null) {
            map.setFeatureState(
              { source: "fairfax-zip-codes", id: hoveredZipCode },
              { hover: false }
            );
          }
          const feature = e.features[0];
          if (feature.properties && feature.properties.ZIPCODE) {
            const zipCode = feature.properties.ZIPCODE;
            setHoveredZipCode(zipCode);
            map.setFeatureState(
              { source: "fairfax-zip-codes", id: zipCode },
              { hover: true }
            );
          }
          map.getCanvas().style.cursor = "pointer";
        }
      });

      map.on("mouseleave", "zip-codes-fill", () => {
        if (hoveredZipCode !== null) {
          map.setFeatureState(
            { source: "fairfax-zip-codes", id: hoveredZipCode },
            { hover: false }
          );
        }
        setHoveredZipCode(null);
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [hoveredZipCode]);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

export default MapComponent;
