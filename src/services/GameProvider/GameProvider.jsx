import React, { createContext } from "react";
import Tube from "../../container/Tube/tube.js";
import TubeList from "../../component/Tubelist";

export const GameContext = createContext({});
const GameProvider = () => {
  const tubeHeight = 250;
  const tubeWidth = 50;
  let numTubes = 6;
  let numColors = 4;
  const game = {
    tube: new Tube(tubeHeight, tubeWidth, numColors),
  };
  return (
    <GameContext.Provider value={game}>
      <TubeList></TubeList>
    </GameContext.Provider>
  );
};

export default GameProvider;
