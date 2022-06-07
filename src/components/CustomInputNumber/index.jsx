import React, { useState } from "react";
import classes from "./index.module.css";

const CustomInputNumber = ({
  min,
  max,
  step = 1,
  name,
  value = 0,
  onChange,
  onBlur,
  disabled,
}) => {
  const [val, setVal] = useState(value);

  const getTargetValue = (targetValue) => {
    if (typeof min !== "undefined" && targetValue < min) {
      return min;
    }
    if (typeof max !== "undefined" && targetValue > max) {
      return max;
    }
    return targetValue;
  };

  // 點擊step按鈕
  const clickHandler = (num) => {
    setVal((preVal) => {
      const res = +preVal + num * step;
      return getTargetValue(res);
    });
  };

  // input框輸入
  const changeHandler = (e) => {
    setVal(getTargetValue(e.target.value));
  };

  return (
    <div className={classes.InputWrapper}>
      <button
        className={classes.MinusBtn}
        onClick={() => clickHandler(-1)}
        type="button"
        disabled={disabled}
      >
        -
      </button>
      <input
        type="number"
        name={name}
        value={val}
        onChange={changeHandler}
        disabled={disabled}
      />
      <button
        className={classes.AddBtn}
        onClick={() => clickHandler(1)}
        type="button"
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
