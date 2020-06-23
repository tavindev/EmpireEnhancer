import select from "select-dom";
import waitAjax from "./wait-ajax";

const A = ["Not Tradable", "Not Accepted"];

export default async () => {
  await waitAjax(".item--trading", ".items-grid");

  let total = 0.0;
  let items = select.all(".item--trading", select(".items-grid"));

  //TODO: Is there anyway i can improve this?
  for (let i = 0; i < items.length; i++) {
    let a =
      items[i].children[0].children[1].children[0].children[0].children[1];

    if (a) {
      let p = a.innerHTML;
      if (!A.includes(p)) {
        p = p.replace(".", "");
        total = total + parseFloat(p.replace(",", "."));
      }
    }
  }

  let p = total.toFixed(2);

  let balanceC = select(".balance");
  let balance = select(".whitespace-no-wrap", balanceC)
    .innerText.replace(".", "")
    .replace(",", ".");

  total = (total + parseFloat(balance)).toFixed(2);
  
  return { p, total };
};
