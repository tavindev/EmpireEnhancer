const elementReady = require("element-ready");

import select from "select-dom";
import storage from "../shared/storage";
import { isLoggedIn } from "./helpers/user";
import waitAjax from "./helpers/wait-ajax";
import { runFeatureIf } from "./helpers/user-settings";
import userInventoryPrice from "./features/show-inventory-price";
import clickClaimRaim from "./features/click-claim-rain";

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
  }
}

function observe() {
  const rainMessage = select(".chat-rain-message");
  if (rainMessage) {
    runFeatureIf("autoClaimRain", clickClaimRaim, rainMessage);
  }

  const observer = new MutationObserver(mutations => {
    //TODO: Implement Button Clicker
    mutations.forEach((item, i) => {
      if (!item.target.className.includes("chat__messages")) {
        const rainMessage = select(".chat-rain-message");
        if (rainMessage) {
          runFeatureIf("autoClaimRain", clickClaimRaim, rainMessage);
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
    userInventoryPrice();
  }
})();
