/** @jsx h */
import { h } from "dom-chef";

export default ({ p, total }) => {
  return (
    <div
      id="inv_price"
      className="flex relative justify-center items-center"
      style={{
        "font-family": "american-captain",
        "font-size": "1.38rem",
        "font-weight": "400",
        color: "silver",
        "margin-left": "1rem"
      }}
    >
      Inventory Price: ${p}
      <span style={{ color: "#10d960", "margin-left": ".25rem" }}>
        (${(p * 1.12).toFixed(2)})
      </span>
      <span style={{ color: "#e9b10b", "margin-left": ".25rem" }}>
        (${total})
      </span>
    </div>
  );
};
