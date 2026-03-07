import React from "react";
import { ratingColor } from "../utils/helpers";

function RatingRing({ rating }) {
  const r = 21;
  const circ = 2 * Math.PI * r;
  const fill = circ * (rating / 10);
  const col = ratingColor(rating);
  return (
    <div className="ring-wrap">
      <svg className="ring-svg" viewBox="0 0 54 54">
        <circle className="ring-bg" cx="27" cy="27" r={r} />
        <circle
          className="ring-fill"
          cx="27"
          cy="27"
          r={r}
          stroke={col}
          strokeDasharray={`${fill} ${circ}`}
        />
        <text className="ring-num" x="27" y="27" fill={col}>
          {rating.toFixed(1)}
        </text>
      </svg>
      <span className="ring-label">Score</span>
    </div>
  );
}

export default RatingRing;
