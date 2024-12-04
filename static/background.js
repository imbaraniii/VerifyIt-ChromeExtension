chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "VerifyIt Selected Text",
      title: "Analyze Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyzeSelectedText") {
      chrome.tabs.sendMessage(tab.id, {
        action: "analyzeSelectedText",
        selectedText: info.selectionText
      });
    }
  });