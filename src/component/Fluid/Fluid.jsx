import React from "react";
import styles from "./Fluid.module.scss";

const Fluid = ({ color, amount }) => {
  return (
    <div
      style={{ backgroundColor: color, height: amount * 50 + "px" }}
      className={"fluid"}
    >
      red
    </div>
  );
};

export default Fluid;
