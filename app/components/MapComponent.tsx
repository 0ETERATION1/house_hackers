"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import fairfaxCountyBoundary from "../data/fairfax_county_boundary.geojson";
import styles from "./MapComponent.module.css";

const MapboxExample: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use the environment variable for the Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/aterskin/cm25ko62f007d01nqf56lhsoy",
      center: [-77.2, 38.85], // Approximate center of Fairfax County
      zoom: 9.5, // Adjusted zoom level for Fairfax County
    });

    mapRef.current = map;

    let hoveredPolygonId: number | string | null = null;

    map.on("load", () => {
      map.addSource("fairfax", {
        type: "geojson",
        data: fairfaxCountyBoundary,
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.addLayer({
        id: "fairfax-fill",
        type: "fill",
        source: "fairfax",
        layout: {},
        paint: {
          "fill-color": "#627BC1",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.5,
          ],
        },
      });

      map.addLayer({
        id: "fairfax-border",
        type: "line",
        source: "fairfax",
        layout: {},
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });

      map.on("mousemove", "fairfax-fill", (e) => {
        if (e.features && e.features[0]) {
          const newHoveredPolygonId = e.features[0].id;
          if (newHoveredPolygonId != null) {
            hoveredPolygonId = newHoveredPolygonId;
            map.setFeatureState(
              { source: "fairfax", id: hoveredPolygonId },
              { hover: true }
            );
          }
        }
      });

      map.on("mouseleave", "fairfax-fill", () => {
        if (hoveredPolygonId !== null) {
          map.setFeatureState(
            { source: "fairfax", id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = null;
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

export default MapboxExample;
