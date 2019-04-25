import wsRemote from "./websocket-remote-server";

async function echo(echoMessage: string) {
  return "OPA " + echoMessage;
}

async function getQuestionaire() {
  return {
    title: "teste",
    a1: "a",
    a2: "b",
    a3: "c",
    a4: "d"
  };
}

wsRemote.initializeWS({
	echo,
	getQuestionaire
});
