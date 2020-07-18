import "./home.scss";

import React from "react";
import axios from "axios";

export function Home() {
  const [hello, setHello] = React.useState("Loading...");
  React.useEffect(() => {
    axios.get("/api/-/healthy")
      .then(resp => resp.data)
      .then(data => setHello(data))
      .catch(err => setHello(err.toString()));
  }, []);
  return <div>{hello}</div>;
}
