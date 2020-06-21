import OptionsSync from 'webext-options-sync'
import storage from "../shared/storage"
import { DEFAULTS } from "../shared/settings"

var webHookUrl = "";
var username = "";

var webhook_is_valid = true;

refreshVars();

function postToWebhook(content) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", webHookUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  data = {
    content: content
  };

  xhr.send(JSON.stringify(data));

  xhr.onload = function(res) {
    console.log("posted: ", res);
  };

  xhr.onerror = function(res) {
    console.log("error posting: ", res);
  };
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse({});
  if (request.type == "update") {
    refreshVars();
  }
  if (request.type == "notify") {
    postToWebhook("<@" + username + ">, Send steam offer");
    var options = {
      title: "CSGOEmpire Deposit",
      message: "10 minutes to send steam offer",
      iconUrl: "icons/icon_1000.png",
      type: "basic"
    };
    chrome.notifications.create("", options);
  }
  if (request.type == "save") {
    postToWebhook(
      "<@" + username + ">, You just saved your settings on the extension."
    );
    var options = {
      title: "CSGOEmpire Deposit",
      message: "You hit save on the extension.",
      iconUrl: "icons/icon_1000.png",
      type: "basic"
    };
    chrome.notifications.create("", options);
  }
  if (request.type == "inventory") {
  }
});

function refreshVars() {
  chrome.storage.sync.get("username", function(data) {
    username = data.username;
    console.log("username: " + username);
  });
  chrome.storage.sync.get("webHookUrl", function(data) {
    webHookUrl = data.webHookUrl;
    console.log("url: " + webHookUrl);
  });
}
