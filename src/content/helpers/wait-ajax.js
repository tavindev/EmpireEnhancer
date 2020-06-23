import select from "select-dom";

function sleep(ms) {
  //function that allows to stop the program for a given time
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (s, o) => {
  /**
    Waits for desired AJAX Content to load
    @param {string} s Content to wait for
    @param {string} o (Optional) Parent Element
    @returns {element}
  */

  do {
    await sleep(500);
  } while (o ? !select(s, select(o)) : !select(s));
  return o ? select(s, select(o)) : select(s);
};
