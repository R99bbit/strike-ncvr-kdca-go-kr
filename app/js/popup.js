/* init flag variables */
var login_wait_flag;
var submit_wait_flag;
var bot_check_flag;

/* init listen function */
function loginWait() {
    console.log('1');

    chrome.storage.local.get(['LoginWaitBypass'], (res) => { login_wait_flag = res.LoginWaitBypass });
    if (login_wait_flag == true) {
        chrome.storage.local.set({ LoginWaitBypass: false });
    } else {
        chrome.storage.local.set({ LoginWaitBypass: true });
    }
}

function submitWait() {
    console.log('2');

    chrome.storage.local.get(['SubmitWaitBypass'], (res) => { submit_wait_flag = res.SubmitWaitBypass });
    if (submit_wait_flag == true) {
        chrome.storage.local.set({ SubmitWaitBypass: false });
    } else {
        chrome.storage.local.set({ SubmitWaitBypass: true });
    }
}

function botCheck() {
    console.log('3');

    chrome.storage.local.get(['BotCheckBypass'], (res) => { bot_check_flag = res.BotCheckBypass });
    if (submit_wait_flag == true) {
        chrome.storage.local.set({ BotCheckBypass: false });
    } else {
        chrome.storage.local.set({ BotCheckBypass: true });
    }
}

/* onloaded event */
document.addEventListener('DOMContentLoaded', () => {
    console.log(Date());

    /* suspend event */
    try {
        document.querySelector('#login-wait-bypass').removeEventListener('click', loginWait);
        document.querySelector('#submit-wait-bypass').removeEventListener('click', submitWait);
        document.querySelector('#bot-check-bypass').removeEventListener('click', botCheck);
    } catch (e) {
        console.log(e);
    }

    chrome.storage.local.get(['LoginWaitBypass'], (res) => { login_wait_flag = res.LoginWaitBypass });
    chrome.storage.local.get(['SubmitWaitBypass'], (res) => { submit_wait_flag = res.SubmitWaitBypass });
    chrome.storage.local.get(['BotCheckBypass'], (res) => { bot_check_flag = res.BotCheckBypass });

    setTimeout(() => {
        if (login_wait_flag == true) {
            document.querySelector('#login-wait-bypass').click();
        }
        setTimeout(() => {
            if (submit_wait_flag == true) {
                document.querySelector('#submit-wait-bypass').click();
            }
            setTimeout(() => {
                if (bot_check_flag == true) {
                    document.querySelector('#bot-check-bypass').click();
                }
                /* restore event */
                document.querySelector('#login-wait-bypass').addEventListener('click', loginWait);
                document.querySelector('#submit-wait-bypass').addEventListener('click', submitWait);
                document.querySelector('#bot-check-bypass').addEventListener('click', botCheck);
            }, 200);
        }, 200);
    }, 200);
});