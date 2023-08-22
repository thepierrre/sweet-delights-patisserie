import { Link } from "react-router-dom";
import images from "./images-urls.ts";
import "./Credits.css";

type Image = {
  name: string;
  url: string;
};

const Credits = () => {
  const imagesSources = images.map((image: Image, index: number) => (
    <Link to={image.url} className="source-link">
      <p key={index}>{image.name}</p>
    </Link>
  ));

  return (
    <div className="container credits">
      <h3 className="sources-header">Sources of the Pictures</h3>
      <h4>(Login may be required)</h4>
      <div className="credits-sources">{imagesSources}</div>
    </div>
  );
};

export default Credits;
