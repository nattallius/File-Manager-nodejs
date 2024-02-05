import {initPromptService} from "./promptService/prompt-service.js";
import {getUsername} from "./helpers/get-username.js";
import {navigationService} from "./navigationService/navigationService.js";


function initApp() {
    const username = getUsername();
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
    process.stdout.write(`You're currently in ${navigationService.dir}\n`);

    function onClose() {
        process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    }

    initPromptService(onClose);
}

initApp();

