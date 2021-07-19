chrome.runtime.onInstalled.addListener(() => {
    // report alert
    alert('[strike-ncvr-kdca-go-kr] 설치 완료!');
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    tabId = activeInfo.tabId
    chrome.tabs.get(tabId, function(tab) {
        if (tab.url == "https://ncvr.kdca.go.kr/") {
            chrome.tabs.sendMessage(tabId, { text: "are_you_there_content_script?" }, function(msg) {
                msg = msg || {};
                if (msg.status != 'yes') {
                    chrome.tabs.executeScript(tabId, { file: "/js/content.js" });
                }
            });
            alert('[strike-ncvr-kdca-go-kr] Bypass 루틴 적용 완료')
        }
    });
});