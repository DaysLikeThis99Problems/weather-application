import React, { useState } from "react";
import S1 from "./ForecastAQI1";
import S2 from "./ForecastAQI2";
import S3 from "./ForecastAQI3";

const ToggleView = ({weather}) => {
  const [visibleComponent, setVisibleComponent] = useState("S1");

  const renderComponent = () => {
    switch (visibleComponent) {
      case "S1":
        return <S1 weather={weather}/>;
      case "S2":
        return <S2 weather={weather}/>;
      case "S3":
        return <S3 weather={weather}/>;
      default:
        return <S1 weather={weather}/>;
    }
  };

  return (
    <div>
      <button id="s1btn" onClick={() => setVisibleComponent("S1")}>DAY-0 AQI</button>
      <button id="s1btn" onClick={() => setVisibleComponent("S2")}>DAY-1 AQI</button>
      <button id="s1btn" onClick={() => setVisibleComponent("S3")}>DAY-2 AQI</button>
      {renderComponent()}
    </div>
  );
};

export default ToggleView;
