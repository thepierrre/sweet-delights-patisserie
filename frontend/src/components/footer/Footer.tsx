import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>Created by Piotr Owczarczyk in 2023.</p>
      <p>
        <Link to="/credits" className="credits-link">
          Click here
        </Link>{" "}
        for the picture credits.
      </p>
    </div>
  );
};

export default Footer;
