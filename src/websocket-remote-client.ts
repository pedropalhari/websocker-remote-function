const WSClient = require("ws");
const ws = new WSClient("ws://localhost:8080");

let wsCaller: any = {};
let promiseMap = {};

function initWSCallerClient(): Promise<any> {
  return new Promise(resolveInitial => {
    ws.on("open", function open() {});

    ws.on("message", function incoming(data) {
      let objectData = JSON.parse(data);

      if (objectData.functions) {
        objectData.functions.forEach(funcName => {
          wsCaller[funcName] = parameters => {
            ws.send(
              JSON.stringify({
                func: funcName,
                data: parameters
              })
            );

            return new Promise(resolve => {
              promiseMap[funcName] = { resolve };
            });
          };
        });

        resolveInitial(wsCaller);
      } else if (objectData.functionResponseName) {
        let { functionResponseName, data } = objectData;
        promiseMap[functionResponseName].resolve(data);
      }
    });
  });
}

let clientExports = {
  initWSCallerClient
};

export default clientExports;
