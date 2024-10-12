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

const MapComponent: React.FC<MapComponentProps> = React.memo(
  ({ schoolRating, numHospitals, avgHomePrice }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const hoveredZipCodeRef = useRef<string | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const updateMapStyle = useCallback(() => {
      const map = mapRef.current;
      if (map && mapLoaded && map.getLayer("zip-codes-fill")) {
        map.setPaintProperty("zip-codes-fill", "fill-color", [
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
        // map.on("mousemove", "zip-codes-fill", (e) => {
        //   if (e.features && e.features.length > 0) {
        //     const feature = e.features[0];
        //     if (feature.properties && feature.properties.ZIPCODE) {
        //       const zipCode = feature.properties.ZIPCODE.toString();
        //       if (hoveredZipCodeRef.current !== zipCode) {
        //         if (hoveredZipCodeRef.current) {
        //           map.setFeatureState(
        //             {
        //               source: "fairfax-zip-codes",
        //               id: hoveredZipCodeRef.current,
        //             },
        //             { hover: false }
        //           );
        //         }
        //         map.setFeatureState(
        //           { source: "fairfax-zip-codes", id: zipCode },
        //           { hover: true }
        //         );
        //         hoveredZipCodeRef.current = zipCode;
        //       }
        //     }
        //   }
        // });

        // map.on("mouseleave", "zip-codes-fill", () => {
        //   if (hoveredZipCodeRef.current) {
        //     map.setFeatureState(
        //       { source: "fairfax-zip-codes", id: hoveredZipCodeRef.current },
        //       { hover: false }
        //     );
        //     hoveredZipCodeRef.current = null;
        //   }
        // });

        // pretty important to set this to true!!!!
        // so that the map style updates when the props change!!!
        setMapLoaded(true);
        updateMapStyle();
      });

      return () => map.remove();
    }, [updateMapStyle]);

    // Update map style when props change
    useEffect(() => {
      updateMapStyle();
    }, [schoolRating, numHospitals, avgHomePrice, updateMapStyle]);

    return <div ref={mapContainerRef} className={styles.mapContainer} />;
  }
);

MapComponent.displayName = "MapComponent";

export default MapComponent;
