import Card from "../shared/Card";

import "./OrderPlaced.css";

import packet from "../../static/others/package.png";

const OrderPlaced = () => {
  return (
    <Card>
      <div className="cart">
        <h2>Order Placed!</h2>
        <div className="packet-image">
          <img src={packet} />
        </div>
        <p className="thank-you">Thank you!</p>
      </div>
    </Card>
  );
};

export default OrderPlaced;
