import React from "react";
import CustomInputNumber from "./components/CustomInputNumber";

const App = () => {
  return (
    <div>
      <h1>APP</h1>
      <input type="number" />
      <p>789 qwe</p>
      <CustomInputNumber onBlur={console.log} />
    </div>
  );
};

export default App;
