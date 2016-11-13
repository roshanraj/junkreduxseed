
    /*!
        Websocket manager 
        Accepts 5 parameters 
        - connection url
        - message send hook
        - on open hook
        - on close hook
        - on message hook
        - log hook

        Authored by Team Hallwaze
    */

(function() {
    "use strict"

    var debugChat = true; 
    var log = function(type, msg) {
            switch (type)
            {
               case "error":
                    console.error("[Ws - Error] ",msg);
                    break;
               case "info":
                    console.log("[Ws - info] ",msg);
                    break;
               case "warning": 
                    console.log("[Ws - warning] ",msg);
                    break;

               default: 
                   console.log("[Ws - logger isseue] ");
            }
        };
    var wsock = null,
        intervalTimerHeartBeat = null,
        lastPingStamp = null,
        sUrl = null,
        cb_registry = [],
        currentMessageId = 0,
        opts = {
            forcedClose: false,
            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            createConnection: true,
            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 2000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 10000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,
            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 5000,
            intervalPing: 2000,
            maxPingFailureCount: 5,
            pingFailureCount: 0,
            reconnectAttempts: 0
        };

    var WsManager = {


        init: function() {},
        
        connect: function() {
            var _this = this;
            var onMessageParser = function(data) {
                //debugger;
                if (typeof data == 'object' && data.e){
                    console.log(data);
                    WsManager.response[data.e](data.p);
                } else{

                    // TODO: Handle text messages.
                }
                // Check if callback exists in registry
                if (typeof data === 'object' && data.rid && cb_registry[data.rid]) {
                    cb_registry[data.rid](data.p);
                }
            };

            var setHeartBeat = function() {

                clearInterval(intervalTimerHeartBeat);
                intervalTimerHeartBeat = setInterval(function() {

                    var currentTime = Date.now().valueOf();
                    if (!lastPingStamp) {
                        lastPingStamp = currentTime;
                    }
                    var timediff = (currentTime - lastPingStamp) ;
                    if (timediff > 30000){
                        console.log("Warning error connecting to internet");
                        WsManager.Prop.setError(true,'Difficulty getting server','Warning');
                    }
                    if (timediff > 60000) {
                        if (wsock.readyState !== wsock.CLOSING && wsock.readyState !== wsock.CLOSED) {
                            WsManager.Prop.setError(true,'Check Internet Connectivity','Error');
                            wsock.close();
                        }
                    }
                }, opts.intervalPing);
            };

            var onPing = function() {

                _this.send('pong');
                var pingStamp = Date.now();
                lastPingStamp = pingStamp.valueOf();
            };

            if (wsock == null || wsock.readyState == wsock.CLOSED) {
                wsock = new WebSocket(sUrl);

                // Reconnecting
                var localWs = wsock;
                var timeoutConnection = setTimeout(function() {
                    localWs.close();
                    WsManager.Prop.setError(true,'Disconnected. Please check Internet Connectivity.','Error');
                    WsManager.response.ConnectionMode({
                        mode: 'reconnecting'
                    });
                }, opts.timeoutInterval);


                wsock.onopen = function(event) {

                    clearTimeout(timeoutConnection);
                    WsManager.response.ConnectionMode({
                        mode: 'connected'
                    });
                    opts.reconnectAttempts = 0;
                    opts.pingFailureCount = 0;
                    setHeartBeat();
                };

                wsock.onmessage = function(event) {
                    var data = event.data;
                    log("info",event.data);
                    if (data == 'ping') {
                        onPing();
                        return;
                    }

                    try {
                        data = JSON.parse(data);
                        console.log(data);
                    } catch (err) {
                        console.log(err);
                    }

                    onMessageParser(data);
                };
                wsock.onerror = function(event) {
                    debugChat && console.log(['wserror', event]);
                    WsManager.response.SockioError({
                        error: event
                    });
                };
                wsock.onclose = function(event) {
                    // clear ping timers
                    lastPingStamp = null;
                    clearInterval(intervalTimerHeartBeat);

                    clearTimeout(timeoutConnection);
                    WsManager.response.SockioClose(event);

                    WsManager.response.ConnectionMode({
                        mode: 'disconnected'
                    });
                    //Reconnecting on close
                    if (!opts.forcedClose) {
                        var reconnectInterval = opts.reconnectInterval * Math.max(1, opts.reconnectAttempts);
                        setTimeout(function() {
                            opts.reconnectAttempts++;
                            _this.connect();
                        }, reconnectInterval > opts.maxReconnectInterval ? opts.maxReconnectInterval : reconnectInterval);
                    } else {
                        opts.reconnectAttempts = 0;
                        opts.forcedClose = false;
                    }
                };
            }
        },

        disconnect: function() {
            if (wsock) {
                opts.forcedClose = true;
                wsock.onclose = function() {}
                wsock.close();
                wsock = null;
            }
        },


        send: function(data, cb) {
            function generateMessageId() {
                if (currentMessageId > 10000)
                    currentMessageId = 0;

                return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
            }
            var payload = null;
            var rid = null;
            if (typeof data == 'object') {
                if (!data.rid) {
                    rid = generateMessageId();
                    data.rid = rid;
                } else {
                    rid = data.rid;
                }
                payload = JSON.stringify(data);
            } else if (typeof data == 'string') {
                payload = data;
            }
            try {
                wsock.send(payload);
                cb && (cb_registry[rid] = cb);
            } catch (err) {
                debugChat && console && console.error && console.error(err);
            }
        },

        wsInit: function(token) {
            log("info","socket initializing");
            if (!opts.createConnection) return;
            var isSecure = window.location.protocol.search("https:") === 0;
            var proto = isSecure ? 'wss://' : 'ws://';
            sUrl = proto + window.location.hostname + '/hallwaze/chat/ws/' + token + '/';
            this.connect();
        },


    };


    module.exports = WsManager;
})();
