import "./App.css";
import Tubelist from "./component/Tubelist";
import GameProvider from "./services/GameProvider";

function App() {
  return (
    <div className="App">
      <GameProvider />
    </div>
  );
}

export default App;
