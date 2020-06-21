import select from "select-dom";
import elementReady from "element-ready";
import waitAjax from "./wait-ajax";

const A = ["Not Tradable", "Not Accepted"];

export default async () => {
  await waitAjax(".item--trading", ".items-grid");

  let total = 0.0;
  let items = select.all(".item--trading", select(".items-grid"));

  //TODO: Is there anyway i can improve this?
  for (let i = 0; i < items.length; i++) {
    let p =
      items[i].children[0].children[1].children[0].children[0].children[1]
        .innerHTML;

    if (!A.includes(p)) {
      p = p.replace(".", "");
      total = total + parseFloat(p.replace(",", "."));
    }
  }
  return total.toFixed(2);
};
