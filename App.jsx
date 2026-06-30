import { useEffect } from "react";
import { Log } from "./services/logger";

function App() {

  useEffect(() => {
    Log(
      "frontend",
      "info",
      "component",
      "Application started successfully"
    );
  }, []);

  return (
    <div>
      <h1>Logging Middleware</h1>
      <p>Check console and network tab</p>
    </div>
  );
}

export default App;