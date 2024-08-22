import * as React from "react";
import Switch from "@mui/material/Switch";

export default function Toggle({ disabled = false, checked, setChecked }) {


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      disabled={disabled}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
