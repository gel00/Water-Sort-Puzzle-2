import React, { useState } from "react";
import Tube from "../Tube";
import styles from "./Tubelist.module.scss";

const Tubelist = () => {
  const tubes = [1, 2, 3, 4, 5, 6];
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const handleClick = (target) => {
    if (origin === target) {
      setOrigin(null);
      target.classList.remove("origin");
    } else if (origin !== null) {
      setDestination(target);
      target.classList.add("destionation");
    } else {
      setOrigin(target);
      target.classList.add("origin");
      setDestination(null);
      target.classList.remove("destionation");
    }
    console.log(origin, target);
  };
  return (
    <div className={styles["tube-list"]}>
      {tubes.map((tube, i) => {
        return <Tube key={"tube" + i} handleClick={handleClick}></Tube>;
      })}
    </div>
  );
};

export default Tubelist;
