import history from "../../static/others/history.jpg";
import mission from "../../static/others/mission.avif";
import "./About.css";

const About = () => {
  return (
    <div className="cart about">
      <h2>About</h2>
      <div className="about-element history">
        <h3>Our History</h3>
        <div className="about-element__content">
          <div className="about-element__content-image">
            <img src={history} />
          </div>
          <div className="about-element__content-text">
            <p>
              Since 1954, <i>Sweet Delights</i> has been a cherished destination
              for connoisseurs of delectable treats in the heart of Munich,
              close to the famous Marienplatz. Our journey began with a
              passionate baker's dream, and over the decades, we have lovingly
              crafted the finest pastries, cakes, and desserts using
              time-honored recipes passed down through generations. The aroma of
              freshly baked delights fills the air, inviting you to savor the
              essence of our tradition.
            </p>
          </div>
        </div>
      </div>
      <div className="about-element mission">
        <h3>The Mission</h3>
        <div className="about-element__content">
          <div className="about-element__content-image">
            <img src={mission} />
          </div>
          <div className="about-element__content-text">
            <p>
              Our mission is to redefine the world of sweets with an approach
              that tantalises taste buds while prioritising well-being and
              environmental consciousness. That's why our creations are crafted
              without a grain of sugar and are proudly vegan. Through our
              commitment to plant-based ingredients and innovative sugar
              alternatives, we have unlocked the realm of guilt-free pleasure.
            </p>
          </div>
        </div>
      </div>
      <div className="about-element contact">
        <h3>Where to Find Us</h3>
        <div className="about-element__content-text">
          <p className="about-contact">
            Visit us at Xylitallee (German for <i>Xylitol Avenue</i>), a
            charming street nestled close to Marienplatz, Munich's heart.
            Whether you have a special celebration or simply desire a sweet
            escape, we look forward to indulging your senses at our place.
          </p>
          <p className="about-contact">
            <i>
              Xylitallee 12
              <br />
              80331 München
              <br />
              +49 89 123456
              <br />
              info@sweetdelights.de
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
