// Normally these would be "import" statements, but this is a simple demo and
// is needed to render in the browser.
import React, { useEffect, useState } from "react";

// Functional component for the SVG map. Take in the map JSON data as a prop and
// return SVG.
const USMap = (props) => {
  const { statesData } = props;

  return (
    <svg viewBox="0 0 960 600">
      {statesData.map((stateData, index) => (
        <path
          className="someCSSClass"
          style={{ cursor: "pointer", fill: "orange" }}
          key={index}
          stroke="#fff"
          strokeWidth="6px"
          d={stateData.shape}
          onMouseOver={(event) => {
            event.target.style.fill = "red";
          }}
          onMouseOut={(event) => {
            event.target.style.fill = "orange";
          }}
        ></path>
      ))}
    </svg>
  );
};

// Functional component for the app. This handles loading the data and showing
// some sort of loading UI while waiting for the data.
const Map = (props) => {
  // The statesData is null by default until we set it.
  const [statesData, setStatesData] = useState(null);
  const { sourceData } = props;

  console.log("sourceData", sourceData);

  // This should only run once due to the [] arg for the dependencies.
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://willhaley.com/assets/united-states-map-react/states.json"
      );
      const statesData = await res.json();
      // Set the statesData with the data received from fetch().
      setStatesData(statesData);
    })();
  }, []);

  // If there is no statesData yet, show a loading indicator.
  if (!statesData) {
    return <div>Loading...</div>;
  }

  return <USMap statesData={statesData} />;
};

export default Map;
