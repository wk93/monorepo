import { useEffect, useState } from "react";
import client from "./utils/client";

function App() {
  const [message, setMessage] = useState("hello");

  useEffect(() => {
    const callApi = async () => {
      const req = await client.index.$get();
      const data = await req.json();
      setMessage(data.message);
    };

    callApi();
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
