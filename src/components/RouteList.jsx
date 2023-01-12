import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Link } from "react-router-dom";

import routeNameList from "../util/routeList";

function renderRow(props) {
  const { index, style } = props;

  return (
    <Link to={`/details/${index}`}>
      <ListItem style={style} component="div" disablePadding>
        <ListItemButton divider>
          <ListItemText primary={`${routeNameList[index]}`} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={600}
        width={360}
        itemSize={66}
        itemCount={10}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
