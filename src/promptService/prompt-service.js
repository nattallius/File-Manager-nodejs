import {createInterface} from 'readline/promises';
import {navigationService} from "../navigationService/navigationService.js";
import {CommandService} from "../commandService/commandService.js";

let rl;
export const initPromptService = (onClose) => {
    rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', async (line) => {
        try {
            const command = CommandService.parseCommand(line);
            if (command.command === '.exit') {
                rl.close(); return;
            }
            await CommandService.executeCommand(command);
        } catch (e) {
            console.log(e.message);
        }
        process.stdout.write(`You're currently in ${navigationService.dir}\n`);
    });
    rl.on('close', onClose);
}