function ChatbroLoader(chats, async) {
    async = !1 !== async;
    var params = {
            embedChatsParameters: chats instanceof Array ? chats : [chats],
            lang: navigator.language || navigator.userLanguage,
            needLoadCode: 'undefined' == typeof Chatbro,
            embedParamsVersion: localStorage.embedParamsVersion,
            chatbroScriptVersion: localStorage.chatbroScriptVersion,
        },
        xhr = new XMLHttpRequest();
    (xhr.withCredentials = !0),
        (xhr.onload = function () {
            eval(xhr.responseText);
        }),
        (xhr.onerror = function () {
            console.error('Chatbro loading error');
        }),
        xhr.open(
            'GET',
            '//www.chatbro.com/embed.js?' +
                btoa(unescape(encodeURIComponent(JSON.stringify(params)))),
            async
        ),
        xhr.send();
}
ChatbroLoader({ encodedChatId: '67LDD' });
