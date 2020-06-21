const elementReady = require("element-ready");

import select from "select-dom";
import storage from "../shared/storage";
import { isLoggedIn } from "./helpers/user";
import calculatePrice from "./helpers/get-inventory-price";
import waitAjax from "./helpers/wait-ajax";
import { isSteamDepositPage } from "./helpers/pages";
import inventoryPriceComponent from "./components/inventory-price";

let controls = {
  onSteamDepositPage: false
};

let config = {
  attributes: false,
  childList: true,
  subtree: true
};

function sleep(ms) {
  //function that allows to stop the program for a given time
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pressok() {
  //function that presses the ok button if it exists
  var btn = document.getElementsByTagName("button"); // find all buttons on the page
  for (
    var i = 0;
    i < btn.length;
    i++ // go through each button
  ) {
    if (btn[i].innerText.indexOf("OK") > -1) {
      // If the button text is Claim FREE Coins
      btn[i].click(); // Click button
      console.log("closed pop up"); // Print Claimed Free coins to the console
    }
  }
}

async function imready() {
  //function that presses the Im ready button if it exists
  var btn = document.getElementsByTagName("button"); // find all buttons on the page
  for (
    var i = 0;
    i < btn.length;
    i++ // go through each button
  ) {
    if (btn[i].innerText.indexOf("Yes, I'm Ready") > -1) {
      // If the button text is I'm Ready, Yes, I\'m Ready
      console.log("Accepted one trade."); // Print accepted one trade to the console
      chrome.runtime.sendMessage({ type: "notify", update: 1 }, function(
        response
      ) {
        //send message to background.js, to send notification and webhook
      });
      await sleep(5000); //wait 5 seconds before pressing i'm ready
      btn[i].click(); // Click button
      await sleep(2000); //wait 2 sec for a potential "trade status slow" pop up
      pressok(); //press ok on this pop up if it exists
      await sleep(50000); //wait 58 seconds before continuing the script, to avoid spamming "I'm ready" button
    }
    if (btn[i].innerText.indexOf("YES, I'M READY") > -1) {
      // If the button text is I'm Ready, Yes, I\'m Ready
      console.log("Accepted one trade."); // Print accepted one trade to the console
      chrome.runtime.sendMessage({ type: "notify", update: 1 }, function(
        response
      ) {
        //send message to background.js, to send notification and webhook
      });
      await sleep(5000); //wait 5 seconds before pressing i'm ready
      btn[i].click(); // Click button
      await sleep(2000); //wait 2 sec for a potential "trade status slow" pop up
      pressok(); //press ok on this pop up if it exists
      await sleep(10000); //wait 58 seconds before continuing the script, to avoid spamming "I'm ready" button
    }
    if (btn[i].innerText.indexOf("Claim FREE Coins") > -1) {
      btn[i].click();
      console.log("Success ! claimed Rain");
    }
  }
}

//????? idk what name i should put help me xD
let checker = async () => {
  await waitAjax(".search");

  let c = select(".search");
  let d = document.createElement("div");

  d.style.width = "100%";
  d.innerHTML = await inventoryPriceComponent(await calculatePrice());

  c.insertBefore(d, c.children[1]);
  c.style.display = "flex";
  c.style.maxWidth = "40rem";
};

function observe() {
  const observer = new MutationObserver(mutations => {
    //TODO: Implement Button Clicker, inventory Price Calculator
    mutations.forEach((item, i) => {
      if (!item.target.className.includes("chat__messages")) {
        //console.log(item);
        if (isSteamDepositPage() && !controls.onSteamDepositPage) {
          checker();
          controls.onSteamDepositPage = true;
        }
        if (!isSteamDepositPage() && controls.onSteamDepositPage) {
          controls.onSteamDepositPage = false;
        }
      }
    });
  });

  observer.observe(document.body, config);
}

(async () => {
  const { extensionEnabled } = await storage.getAll();

  if (!extensionEnabled) {
    return;
  }

  if (isLoggedIn) {
    observe();
  }
})();
