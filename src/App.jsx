import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const URL = "http://localhost:8080";
  const getThings = async function () {
    const response = await axios.get(URL);
    return response.data;
  };
  const postNewThing = async function (thing) {
    const addedThing = await axios.post(URL, { thing });
    return addedThing.data;
  };

  const [value, setValue] = useState("");
  const [things, setThings] = useState([]);

  const handleGetThings = async function () {
    const thingsFromDB = await getThings();
    setThings(thingsFromDB);
  };

  const handleclick = async function () {
    await postNewThing(value);
    setValue("");
    handleGetThings();
  };
  useEffect(()=>{
    handleGetThings()
  },[])

  return (
    <div className="App">
      <input
        type="text"
        placeholder="thing"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <button onClick={handleclick}>add</button>
      <div>
        {things.map((t, i) => (
          <div key={i}>{t.thing}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
