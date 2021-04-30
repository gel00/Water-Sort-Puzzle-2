import React, { createRef, useEffect } from "react";
import styles from "./Fluid.module.scss";

const Fluid = ({ color, amount, height }) => {
  //const [level, setlevel] = useState(amount);
  const self = createRef();
  useEffect(() => {}, []);
  return (
    <div
      ref={self}
      style={{ backgroundColor: color, height: amount * height }}
      className={styles.fluid}
    >
      red
    </div>
  );
};

export default Fluid;
