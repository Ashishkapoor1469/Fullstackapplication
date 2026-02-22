import { useState, useEffect } from "react";

export function useIPLocation(ip) {
  const [location, setlocation] = useState("...");
  useEffect(() => {
    if (!ip) {
      console.log("no if exist");

      return;
    }
    fetch(`http://ip-api.com/json/${ip}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          setlocation("unknown location");
        } else {
          setlocation(`${data.city} ${data.regionName} ${data.country}`);
        }
      })
      .catch((err) => {
        setlocation("unknown location err");
        console.log(err);
      });
    return location;
  }, [ip]);
}
