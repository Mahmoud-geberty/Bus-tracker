import React, { useEffect, useState } from "react";
import Map, { Layer, Source, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import busStop from "../bus-stop.png";
import busLoc from "../bus-location.png";

const MAP_TOKEN =
  "pk.eyJ1IjoibWFobW91ZDE5OTgiLCJhIjoiY2xjZDh2cDRjMW9tNDNycGNxZjBibmZkNCJ9.HJ11p_VfQt813-pbUBTrlg";

export default function MyMap(props) {
  let { track, longitude, latitude, endLng, endLat, busLng, busLat } = props;

  console.log("map render, props:", props);

  const [geojson, setGeojson] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [[0, 0], 1, 2, 3, 4, 5, 6, 7, 8, 9, [0, 0]],
    },
  });
  const [viewState, setViewState] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 14.5,
  });
  const [markerLoc, setMarkerLoc] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [trackIndex, setTrackIndex] = useState(0);
  const [intervalExists, setIntervalExists] = useState(false);
  const [autoViewState, setAutoViewState] = useState(true);
  const fakeMode = 0; // 0 for server location and 1 for trackIndex location

  // updates the data
  useEffect(() => {
    if (geojson.geometry.coordinates[1] !== 1) {
      if (!fakeMode) {
        console.log("updating Marker, old: ", markerLoc);
        setMarkerLoc({
          longitude: busLng,
          latitude: busLat,
        });

        if (autoViewState) {
          setViewState(({ zoom }) => {
            return {
              longitude: busLng,
              latitude: busLat,
              zoom: zoom,
            };
          });
        }
      }
    }
  }, [busLng, busLat]);

  // given a track which has point that the bus needs to go through, get a geojson route and paint it on the map.
  useEffect(() => {
    const getRoute = async () => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${track}?steps=true&geometries=geojson&access_token=${MAP_TOKEN}`
      );
      const res = await response.json();
      const data = res.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: route },
      };
      console.log("new route:", geojson);
      setGeojson(geojson);
    };

    getRoute();
  }, []);

  // animate the bus location marker in fakeMode
  useEffect(() => {
    if (fakeMode) {
      if (geojson.geometry.coordinates[1] !== 1 && !intervalExists) {
        setIntervalExists(true); // prevent registering more than one setInterval callback
        const interval = setInterval(() => {
          setTrackIndex((index) => {
            if (index === geojson.geometry.coordinates.length - 1) {
              clearInterval(interval);
              return index;
            } else {
              return index + 1;
            }
          });
        }, 3000);
      }

      if (autoViewState) {
        setViewState(({ zoom }) => {
          const ret = {
            zoom: zoom,
            longitude: geojson.geometry.coordinates[trackIndex][0],
            latitude: geojson.geometry.coordinates[trackIndex][1],
          };
          return ret;
        });

        setMarkerLoc({
          longitude: geojson.geometry.coordinates[trackIndex][0],
          latitude: geojson.geometry.coordinates[trackIndex][1],
        });
      }
    }
  }, [geojson, trackIndex]);

  return (
    <Map
      {...viewState}
      style={{ width: 400, height: 400 }}
      onMove={(evt) => {
        setAutoViewState(false); // stop the screen from following the bus but keep the bus moving
        setViewState(evt.viewState);
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAP_TOKEN}
    >
      {geojson && (
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer
            id="route"
            type="line"
            paint={{
              "line-color": "#005c9f",
              "line-width": 8,
              "line-opacity": 0.75,
            }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
        </Source>
      )}
      <Marker longitude={endLng} latitude={endLat} anchor="top">
        <img
          src={busStop}
          alt="bus-stop icon"
          style={{ width: "10vw", height: "10vw" }}
        />
      </Marker>
      {geojson && (
        <Marker
          longitude={markerLoc.longitude}
          latitude={markerLoc.latitude}
          anchor="bottom"
        >
          <img
            src={busLoc}
            alt="bus-stop icon"
            style={{ width: "10vw", height: "10vw" }}
          />
        </Marker>
      )}
      <Marker
        longitude={geojson.geometry.coordinates[0][0]}
        latitude={geojson.geometry.coordinates[0][1]}
        anchor="top"
      >
        <div
          style={{
            width: "8vw",
            height: "8vw",
            backgroundColor: "#005c9f",
            borderRadius: "50%",
            border: "solid white heavy",
          }}
        />
      </Marker>
    </Map>
  );
}
