import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Data, setData] = useState("");

  useEffect(() => {
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/user");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  getData();
}, []);   // ← VERY IMPORTANT: empty [] stops repeated calls

  return (
    <>
      <h1>DATA:{Data.message}</h1>
    </>
  );
}

export default App;
