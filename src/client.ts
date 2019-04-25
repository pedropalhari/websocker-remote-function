import wsCallerClient from "./websocket-remote-client";

interface wsCallerType {
  echo: Function;
  getQuestionaire: Function;
}

(async () => {
  let wsCaller: wsCallerType = await wsCallerClient.initWSCallerClient();
	let questionaire = await wsCaller.getQuestionaire();	
	let questionaire2 = await wsCaller.getQuestionaire();
})();
