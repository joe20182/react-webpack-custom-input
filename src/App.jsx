import React from "react";
import CustomInputNumber from "./components/CustomInputNumber";
import RoomAllocation from "./components/RoomAllocation";
import classes from "./App.module.css";

const App = () => {
  return (
    <div className={classes.AppWrapper}>
      <h2>CustomInputNumber</h2>
      <CustomInputNumber
        onBlur={console.log}
        onChange={console.log}
        max={10}
        min={-6}
        disabled={false}
        value={3}
        step={3}
      />
      <h2>RoomAllocation</h2>
      <RoomAllocation guest={8} room={3} />
    </div>
  );
};

export default App;
