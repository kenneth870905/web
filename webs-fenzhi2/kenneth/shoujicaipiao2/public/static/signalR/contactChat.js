var appPage = {
    chat: null,
    init: function (chatId, url, roomPwd) {
        if (appPage.chat != null) {
            $.connection.hub.stop();

            $.connection.hub.qs = {
                groupId: chatId,
                chatId: chatId,
                roomPwd: roomPwd
            };

            $.connection.hub.start().done(function () { });

            return;
        }

        //appPage.chat = $.connection.chatHubApp;
        appPage.chat = $.connection.contactChatHub;
        var chat = appPage.chat;

        if (url) {
            $.connection.hub.url = url;
        }
        
        $.connection.hub.qs = {
            chatId: chatId,
            groupId: chatId,
            roomPwd: roomPwd
        };

        $.connection.hub.logging = true;

        chat.client.chatText = function (data) {
            //接收到普通消息
            console.log('普通信息', data);

            window.appVue.addmsg(data);
        }

        chat.client.retractMsg = function (messageId) {
            //接收到撤回消息
            console.log('消息撤回', messageId);

            window.appVue.deleteMsg(messageId);
        }

        chat.client.info = function (data) {
            //接收到错误信息
            //console.log(data);
            window.appVue.userinit(data);
        }

        chat.client.tip = function (data) {
            //打印调试信息
            console.log(data);
        }

        $.connection.hub.stateChanged(function (state) {
            console.log(state.newState);

            window.appVue.chatState(state);
            if (state.newState == 0) {
                console.log('正在连接...');
            }
            else if (state.newState == 1) {
                console.log('连接成功');
            }
            else if (state.newState == 2) {
                console.log('重新连接...');
            }
            else if (state.newState == 4) {
                console.log('连接已断开');
            }
        });

        $.connection.hub.start().done(function () {
            console.log($.connection.hub.transport.name)
        });
    },
    chatSend: function (text) {
        if (text && appPage.chat) {
            appPage.chat.server.chatSendText(text);
        }
    },
    chatSendImg: function (img) {
        if (img && appPage.chat) {
            appPage.chat.server.chatSendImg(img);
        }
    }
};