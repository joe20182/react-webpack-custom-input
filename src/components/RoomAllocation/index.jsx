import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.css";
import Room from "./Room";

const INIT_ROOM_DATA = { adult: 1, child: 0 };

const RoomAllocation = ({ guest, room, onChange }) => {
  const initAllocationData = Array(room)
    .fill(1)
    .map(() => INIT_ROOM_DATA);
  const [allocationData, setAllocationData] = useState(initAllocationData);
  // 計算出已分配人數
  const allocatedGuys = allocationData.reduce(
    (pre, cur) => pre + cur.adult + cur.child,
    0
  );

  const disabled = guest === room;

  const roomChangeHandler = (index, data) => {
    setAllocationData((preData) => {
      const newAllocationData = preData.map((obj, i) => {
        if (i === index) {
          return { ...obj, ...data };
        }
        return obj;
      });
      typeof onChange !== "undefined" && onChange(newAllocationData);
      return newAllocationData;
    });
  };

  return (
    <div className={classes.RoomAllocationWrapper}>
      {/* 統計 */}
      <div className={classes.SumWrapper}>
        <div className={classes.SumTitle}>
          住客人數 : {guest} 人 / {room} 房
        </div>
        <div className={classes.GuysLeft}>
          尚未分配人數 : {guest - allocatedGuys} 人
        </div>
      </div>
      {/* 房間分配 */}
      {Array(room)
        .fill(1)
        .map((_, index) => (
          <Room
            key={index}
            disabled={disabled}
            onChange={(data) => roomChangeHandler(index, data)}
            totalLeft={guest - allocatedGuys}
          />
        ))}
    </div>
  );
};

RoomAllocation.propTypes = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default RoomAllocation;
