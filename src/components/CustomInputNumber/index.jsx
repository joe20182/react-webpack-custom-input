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
  disableAdd = false,
}) => {
  const [val, setVal] = useState(value);
  const inputRef = useRef();

  useEffect(() => {
    // console.log(val);
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
    // 禁止增加
    if (num === 1 && disableAdd) return;

    setVal((preVal) => {
      const res = +preVal + num * step;
      return getTargetValue(res);
    });
  };

  const minusHandler = () => {
    setVal((preVal) => {
      const res = +preVal - step;
      if (typeof min !== "undefined" && res < min) {
        return min;
      }
      return res;
    });
  };
  const addHandler = () => {
    setVal((preVal) => {
      const res = +preVal + step;
      if (typeof max !== "undefined" && res > max) {
        return max;
      }
      return res;
    });
  };

  // input框輸入
  const changeHandler = (e) => {
    setVal(getTargetValue(e.target.value));
  };

  return (
    <div className={classes.InputWrapper}>
      <StepButton onClick={minusHandler} disabled={disabled} variant="minus">
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
      <StepButton onClick={addHandler} disabled={disabled}>
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
  disableAdd: PropTypes.bool,
};

export default CustomInputNumber;
