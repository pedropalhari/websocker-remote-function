const WS = require("ws");

function initializeWS(functionObject, port: number = 8080) {
  console.log(`Initializing server on port ${port}`);
  const wss = new WS.Server({ port });
  console.log("Done");

  wss.on("connection", function connection(ws) {
    ws.send(
      JSON.stringify({
        functions: Object.keys(functionObject)
      })
    );

    ws.on("message", async function incoming(message) {
      let wsObject = JSON.parse(message);
      let { func, data } = wsObject;

      let response = await functionObject[func](data);

      ws.send(
        JSON.stringify({
          functionResponseName: func,
          data: response
        })
      );
    });
  });
}

const serverExports: {
  initializeWS: typeof initializeWS;
} = {
  initializeWS
};

export default serverExports;
