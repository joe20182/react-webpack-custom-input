import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.css";

let itv;

const StepButton = ({
  children,
  disabled,
  onClick,
  onPressDown = onClick,
  variant = "add",
}) => {
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    if (isHolding) {
      itv = setInterval(onPressDown, 100);
    } else {
      clearInterval(itv);
    }
  }, [isHolding]);

  return (
    <button
      className={variant === "minus" ? classes.MinusBtn : classes.AddBtn}
      onClick={onClick}
      type="button"
      disabled={disabled}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
    >
      {children}
    </button>
  );
};

StepButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onPressDown: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["add", "minus"]),
};

export default StepButton;
