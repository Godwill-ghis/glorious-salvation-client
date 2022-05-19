import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Today = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (value === 0) {
      setValue(1);
    } else {
      setValue(0);
    }
  };
  return (
    <div>
      <Box
        sx={{ width: "100%", bgcolor: "background.paper", marginBottom: "2em" }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab component={Link} label='Verse of the Day' to='/today' />
          <Tab component={Link} label='Prayer of the Day' to='/today/prayers' />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
};

export default Today;
