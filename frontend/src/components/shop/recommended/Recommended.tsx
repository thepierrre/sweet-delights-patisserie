import RecommendedItem from "./RecommendedItem";

import "./Recommended.css";

const Recommended = () => {
  return (
    <div className="recommended">
      <div className="recommended-items">
        <RecommendedItem />
        <RecommendedItem />
      </div>
    </div>
  );
};

export default Recommended;
