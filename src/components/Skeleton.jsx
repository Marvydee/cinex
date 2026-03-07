import React from "react";
function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skel-img shimmer" />
      <div className="skel-body">
        <div className="skel-line shimmer" />
        <div className="skel-line w60 shimmer" />
      </div>
    </div>
  );
}

export default SkeletonCard;
