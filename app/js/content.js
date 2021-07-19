/**
 *  @description 페이지에 구현되어 있는 함수를 사용하기 위해 DOM을 인젝션 함
 *  @param String
 */
function injectScript(code) {
    var actualCode = code;
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}

/**
 *  @description 최적화 로직 : content script가 injection 되었는가? [MUTEX]
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text === 'are_you_there_content_script?') {
        sendResponse({ status: "yes" });
    }
});

injectScript(`
NetFunnel.TS_BYPASS = true
if(NetFunnel.TS_BYPASS == true) { console.log('Bypass NCVR OK') }
`)