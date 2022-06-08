import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomInputNumber from "../CustomInputNumber";
import classes from "./index.module.css";

// 房間一律為四人房
const MAX_PERSON = 4;

const Room = ({ onChange, disabled, totalLeft }) => {
  const [guys, setGuys] = useState(1);
  const [children, setChildren] = useState(0);

  const totalPerson = guys + children;
  const full = totalPerson >= MAX_PERSON;

  useEffect(() => {
    typeof onChange !== "undefined" &&
      onChange({ adult: guys, child: children });
  }, [totalPerson]);

  const guyChangeHandler = (e) => {
    const res = +e.target.value;
    if (res > MAX_PERSON) return;
    setGuys(res);
  };

  const childChangeHandler = (e) => {
    const res = +e.target.value;
    if (res > MAX_PERSON) return;
    setChildren(res);
  };

  return (
    <div className={classes.RoomWrapper}>
      <div className={classes.RoomTitle}>房間 : {totalPerson} 人</div>
      <div className={classes.AllocationBar}>
        <div>
          <div>大人</div>
          <div className={classes.AllocationDesc}>年齡 20+</div>
        </div>
        <CustomInputNumber
          min={1}
          max={Math.min(totalLeft + guys, MAX_PERSON - children)}
          value={1}
          onChange={guyChangeHandler}
          disabled={disabled}
          disableAdd={full}
        />
      </div>
      <div className={classes.AllocationBar}>
        <div>
          <div>小孩</div>
        </div>
        <CustomInputNumber
          min={0}
          max={Math.min(totalLeft + children, MAX_PERSON - guys)}
          onChange={childChangeHandler}
          disabled={disabled}
          disableAdd={full}
        />
      </div>
    </div>
  );
};

Room.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  totalLeft: PropTypes.number,
};

export default Room;
