import React from "react";
import RouteDetailBar from "./RouteDetailBar";
import MapCard from "./MapCard";
import { useParams } from "react-router-dom";
import routeNameList, { routeDataList } from "../util/routeList";

export default function RouteDetails() {
  let { index } = useParams();

  let [capacity, setCapacity] = React.useState(0);
  let [busLng, setBusLng] = React.useState(0);
  let [busLat, setBusLat] = React.useState(0);

  React.useEffect(() => {
    const getCapacity = async () => {
      const response = await fetch(
        "https://confused-rebel-fruitadens.glitch.me/"
      );

      const status = await response.json();
      setCapacity(status.capacity);
    };

    const getLocation = async () => {
      const response = await fetch(
        "https://confused-rebel-fruitadens.glitch.me/gps"
      );

      const status = await response.json();
      console.log("gps response:", status);
      setBusLng(status.longitude);
      setBusLat(status.latitude);
    };

    const interval1 = setInterval(getCapacity, 1000);
    const interval2 = setInterval(getLocation, 3000);

    const clearTimers = () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };

    return () => clearTimers();
  }, []);

  // MapCard props object
  let mapCardProps = {
    routeName: routeNameList[parseInt(index)], //string
    routeData: routeDataList[parseInt(index)], // object with keys => origin, points, end
    capacity: capacity,
    busLng: busLng,
    busLat: busLat,
  };

  return (
    <div>
      <RouteDetailBar routeName={routeNameList[index]} />
      <MapCard {...mapCardProps} />
    </div>
  );
}
