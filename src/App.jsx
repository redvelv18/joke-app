import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [setup, setSetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [punchline, setPunchline] = useState("");

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function loadJoke() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!response.ok) {throw new Error("something went wrong");}
      const joke = await response.json();

      setSetup(joke.setup);
      setPunchline(joke.punchline);

    } catch (err) {
      setError(err instanceof Error ? err.message : "uhhhhjjj.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <div>

      <h1>Random Jokes😄</h1>
      <div id="container">
        <div id="content"> 
      {loading && <p>Loading joke...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          <p><strong> {setup} </strong></p>

          <button onClick={() => setShow((prev) => !prev)} id="showbutton">
            {show ? "Hide Punchline" : "Show Punchline"}
          </button>
          {show && (<p>{punchline}</p>)}
          
        </div>
      )}
      </div>  
    </div>
      <button onClick={loadJoke} disabled={loading} id="anotherbutton">
        Get Another Joke
      </button>
    </div>
  );
}

export default App;
