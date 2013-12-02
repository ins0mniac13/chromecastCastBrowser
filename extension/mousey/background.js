
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
        //console.log(tab.id + ' onClicked');
        if (sessionStorage.getItem(tab.id) == 'false')
        {
        sessionStorage.setItem(tab.id, 'true');
        }
        else if (sessionStorage.getItem(tab.id) == 'true')
        {
        sessionStorage.setItem(tab.id, 'false');
        }

        chrome.tabs.executeScript(null,{file: "content.js", allFrames: true });
        // No tabs or host permissions needed!


        });

// called when tab is refreshed or iframe src changes/etc
// re-adds mousey if enabled
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        //console.log(tab.id + ' onUpdated');
        if (sessionStorage.getItem(tabId) == 'true')
        {
        chrome.tabs.executeScript(null,{file: "content.js", allFrames: true });
        }
        });
// called when content script connects to background script
// responds to request from content script for enabled status
chrome.runtime.onConnect.addListener(function(port) {
        //console.log(port.sender.tab.id + ' onConnect');

        console.assert(port.name == "mouseEnabled");

        port.onMessage.addListener(function(msg) {
            if (msg.getEnabled == "1")
            port.postMessage({enabled: sessionStorage.getItem(port.sender.tab.id)});
            });
        });

// called when tab is closed
// removes tabId enabled status from session storage
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
        //console.log(tabId + ' onRemoved');
        sessionStorage.removeItem(tabId);
        });

// called when a new tab is created
// initializes enabled status for tab to false
chrome.tabs.onCreated.addListener(function(tab) {
        //console.log("tab id: " + tab.id);
        sessionStorage.setItem(tab.id, 'false');
        });

// called when tab is replaced, ie. when the tabId changes
// tabId of new tabs changes if a URL is entered into the
// address bar and submitted.

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
        //console.log("tab id: " + removedTabId + " changed to: " + addedTabId);
        sessionStorage.setItem(addedTabId, sessionStorage.getItem(removedTabId) || 'false');
        sessionStorage.removeItem(removedTabId);
        });
