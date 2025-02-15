import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import RadialSeparators from "./RadialSeparators";

const CircularRating = ({
  rating = 1,
  text = "RATING",
  textColor = "rgba(255, 255, 255, 0.66)",
  lineColor = "rgba(255, 255, 255, 0.1)",
  fillColor = "#daf561",
  backgroundColor = "#132441",
}) => {
  return (
    <div>
      <CircularProgressbarWithChildren
        value={rating}
        minValue={0}
        maxValue={5}
        strokeWidth={4}
        styles={{
          root: {},
          path: {
            stroke: fillColor,
            strokeLinecap: "butt",
            strokeWidth: 5,
          },
          trail: {
            stroke: lineColor,
            strokeLinecap: "butt",
          },
        }}
      >
        <RadialSeparators
          count={5}
          style={{
            background: backgroundColor,
            width: "3.5px",
            height: `${5}%`,
            transform: "scale(1.5)",
          }}
        />
        <div style={{ fontSize: "13px", fontWeight: "bold", color: textColor }}>
          {text}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularRating;
