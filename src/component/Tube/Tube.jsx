import React from "react";
import styles from "./Tube.module.scss";
import Fluid from "../Fluid";

const Tube = ({ handleClick }) => {
  const fluidColors = ["red", "red", "blue", "green"];
  const fluids = fluidColors.map((color) => {
    return { color: color, amount: 1 };
  });
  fluids.forEach((fluid, i, fluids) => {
    if (i < fluids.length - 1) {
      if (fluid.color === fluids[i + 1].color) {
        fluids[i + 1].amount++;
        fluids.splice(0, 1);
      }
    }
  });
  return (
    <div
      className={styles.tube}
      onClick={(event) => {
        handleClick(event.target);
      }}
    >
      {fluids.reverse().map((fluid) => {
        return <Fluid color={fluid.color} amount={fluid.amount}></Fluid>;
      })}
    </div>
  );
};

export default Tube;
