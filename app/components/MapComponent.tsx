"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import virginiaOutline from '../data/virginia_outline.geojson';

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Use the environment variable for the Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/aterskin/cm25ko62f007d01nqf56lhsoy',
      center: [-100.486052, 37.830348],
      zoom: 2
    });

    mapRef.current = map;

    let hoveredPolygonId: number | string | null = null;

    map.on('load', () => {
      map.addSource('virginia', {
        type: 'geojson',
        data: virginiaOutline
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.addLayer({
        id: 'virginia-fill',
        type: 'fill',
        source: 'virginia',
        layout: {},
        paint: {
          'fill-color': '#627BC1',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
        }
      });

      map.addLayer({
        id: 'virginia-border',
        type: 'line',
        source: 'virginia',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 2
        }
      });

      map.on('mousemove', 'virginia-fill', (e) => {
        if (e.features?.[0]) {
          if (hoveredPolygonId !== null) {
            map.setFeatureState(
              { source: 'virginia', id: hoveredPolygonId },
              { hover: false }
            );
          }
          hoveredPolygonId = e.features[0].id ?? null;
          if (hoveredPolygonId !== null) {
            map.setFeatureState(
              { source: 'virginia', id: hoveredPolygonId },
              { hover: true }
            );
          }
        }
      });

      map.on('mouseleave', 'virginia-fill', () => {
        if (hoveredPolygonId !== null) {
          map.setFeatureState(
            { source: 'virginia', id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = null;
      });
    });
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapboxExample;
