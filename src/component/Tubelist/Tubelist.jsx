import React from "react";
import Tube from "../Tube";
import styles from "./Tubelist.module.scss";

const Tubelist = () => {
  const tubes = [1, 2, 3, 4, 5, 6];
  return (
    <div className={styles["tube-list"]}>
      {tubes.map((tube) => {
        return <Tube></Tube>;
      })}
    </div>
  );
};

export default Tubelist;
