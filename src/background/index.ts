import OptionsSync from 'webext-options-sync'
import browser from 'webextension-polyfill'
import storage from '../shared/storage'
import { DEFAULTS } from '../shared/settings'

import ky from 'ky'

var webHookUrl = ''
var username = ''

var webhook_is_valid = true

var totp = require('notp').totp
var base32 = require('thirty-two')

refreshVars()

function postToWebhook(content) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', webHookUrl, true)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

    const data = {
        content: content,
    }

    xhr.send(JSON.stringify(data))

    xhr.onload = function (res) {
        console.log('posted: ', res)
    }

    xhr.onerror = function (res) {
        console.log('error posting: ', res)
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //sendResponse({});
    /**if (request.type == "update") {
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
  }*/

    if (request.type == 'inventory') {
        /**getMarketData().then(parsed => {
      sendResponse({ response: parsed });
    });
    return true;*/

        return browser.notifications.create('', {
            type: 'basic',
            message: 'extension loaded',
        })
    }
})

async function getMarketData() {
    const code = '988690'
    const parsed = await ky
        .post(
            `https://bitskins.com/api/v1/get_all_item_prices/?api_key=4a2bfb5e-5d76-4ecd-9369-962cbcc14ad1&app_id=730&code=${code}`,
        )
        .json()
    return parsed
}

function refreshVars() {
    chrome.storage.sync.get('username', function (data) {
        username = data.username
        console.log('username: ' + username)
    })
    chrome.storage.sync.get('webHookUrl', function (data) {
        webHookUrl = data.webHookUrl
        console.log('url: ' + webHookUrl)
    })
}
