import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [AnimeFesuta, setAnimeFesuta] = useState(false);

  const handleClick = () => {
    setAnimeFesuta(!AnimeFesuta);
  };

  return (
    <>
      <Button onClick={handleClick}>
        {AnimeFesuta ? "AnimeFesuta是漫展~" : "AnimeFesuta"}
      </Button>
    </>
  );
}

export default App;
