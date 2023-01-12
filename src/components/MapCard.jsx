import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import MyMap from "./MapRoute";

export default function ImgMediaCard(props) {
  // will be input props later.

  const originLng = props.routeData.origin[0];
  const originLat = props.routeData.origin[1];
  const endLng = props.routeData.end[0];
  const endLat = props.routeData.end[1];
  const busLng = props.busLng;
  const busLat = props.busLat;
  let track = "";

  // handle intermediate points, and contruct the track string
  // in this components then pass it to the map component
  if (props.routeData.points) {
    track = `${originLng},${originLat}${props.routeData.points}${endLng},${endLat}`;
  } else {
    track = `${originLng},${originLat};${endLng},${endLat}`;
  }

  // props for MyMap component
  const initialProps = {
    track: track,
    longitude: 103.634824, // map initial center lng
    latitude: 1.559694, // map initial center lat
    endLng: endLng,
    endLat: endLat,
    busLng: busLng,
    busLat: busLat,
    originLng: originLng,
    originLat: originLat,
  };

  return (
    <div>
      <div style={{ display: "block", height: 10 }}></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 345 }}>
          <MyMap {...initialProps} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.routeName}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Capacity: {props.capacity} <br />
              Status : On time <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
