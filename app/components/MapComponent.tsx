"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
  console.error("Mapbox access token is missing");
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

console.log("Environment token:", process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapboxgl.supported()) {
      setError("Your browser does not support Mapbox GL");
      return;
    }

    if (map.current) return;
    if (!mapContainer.current) return;

    console.log("Initializing map...");
    console.log("Mapbox Token:", process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    let mapInstance: mapboxgl.Map | null = null;

    try {
      mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 9,
        transformRequest: (url, resourceType) => {
          console.log(`Resource request: ${url}, Type: ${resourceType}`);
          return { url };
        },
      });

      mapInstance.on("load", () => {
        console.log("Map loaded successfully");
        setMapLoaded(true);
        map.current = mapInstance;
      });

      mapInstance.on("error", (e) => {
        console.error("Mapbox error:", e);
        setError(`Mapbox error: ${e.error}`);
      });

      mapInstance.on("styledata", () => {
        console.log("Style data loaded");
      });

      mapInstance.on("sourcedata", () => {
        console.log("Source data loaded");
      });
    } catch (err) {
      console.error("Error initializing map:", err);
      setError(
        `Failed to initialize map: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }

    const initTimeout = setTimeout(() => {
      if (!mapLoaded) {
        console.log("Map initialization timed out");
        setError("Map initialization timed out");
      }
    }, 10000); // 10 seconds timeout

    return () => {
      clearTimeout(initTimeout);
      if (mapInstance && mapInstance.loaded()) {
        console.log("Removing map...");
        mapInstance.remove();
      } else {
        console.log("Map not fully loaded, skipping removal");
      }
    };
  }, [mapLoaded]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      {!mapLoaded && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            padding: "5px",
            zIndex: 10,
          }}
        >
          Loading map...
        </div>
      )}
    </div>
  );
}
