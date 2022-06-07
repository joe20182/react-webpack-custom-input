import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.css";
import StepButton from "./StepButton";

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
  const inputRef = useRef();

  useEffect(() => {
    typeof onChange !== "undefined" && onChange({ target: inputRef.current });
  }, [val]);

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
      <StepButton
        onClick={() => clickHandler(-1)}
        disabled={disabled}
        variant="minus"
      >
        -
      </StepButton>
      <input
        ref={inputRef}
        type="number"
        name={name}
        value={val}
        onChange={changeHandler}
        disabled={disabled}
        onBlur={onBlur}
      />
      <StepButton onClick={() => clickHandler(1)} disabled={disabled}>
        +
      </StepButton>
    </div>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomInputNumber;
