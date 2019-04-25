"use strict";
exports.__esModule = true;
var WSClient = require("ws");
var ws = new WSClient("ws://localhost:8080");
var wsCaller = {};
var promiseMap = {};
function initWSCallerClient() {
    return new Promise(function (resolveInitial) {
        ws.on("open", function open() { });
        ws.on("message", function incoming(data) {
            var objectData = JSON.parse(data);
            if (objectData.functions) {
                objectData.functions.forEach(function (funcName) {
                    wsCaller[funcName] = function (parameters) {
                        ws.send(JSON.stringify({
                            func: funcName,
                            data: parameters
                        }));
                        return new Promise(function (resolve) {
                            promiseMap[funcName] = { resolve: resolve };
                        });
                    };
                });
                resolveInitial(wsCaller);
            }
            else if (objectData.functionResponseName) {
                var functionResponseName = objectData.functionResponseName, data_1 = objectData.data;
                promiseMap[functionResponseName].resolve(data_1);
            }
        });
    });
}
var clientExports = {
    initWSCallerClient: initWSCallerClient
};
exports["default"] = clientExports;
