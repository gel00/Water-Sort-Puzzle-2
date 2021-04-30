import React, { useContext } from "react";
import styles from "./Tube.module.scss";
import { GameContext } from "../../services/GameProvider/GameProvider";
import Fluid from "../Fluid";

const Tube = ({ handleClick }) => {
  const gameContext = useContext(GameContext);
  const { width, height, fluidMaxLevel, fluidHeight } = gameContext.tube;
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
  console.log(height);
  return (
    <div
      style={{ height: height, width: width }}
      className={styles.tube}
      onClick={(event) => {
        handleClick(event.target);
      }}
    >
      <div
        style={{ width: width * (fluidMaxLevel + 2) }}
        className={styles.fluids}
      >
        {fluids.reverse().map((fluid) => {
          return (
            <Fluid
              height={fluidHeight}
              color={fluid.color}
              amount={fluid.amount}
            ></Fluid>
          );
        })}
      </div>
    </div>
  );
};

export default Tube;
