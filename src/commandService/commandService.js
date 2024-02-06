import {navigationService} from "../navigationService/navigationService.js";
import {OperatingSystemService} from "../operatingSystemService/operatingSystemService.js";
import {ERRORS} from "../constants/errors.js";
import {HashService} from "../hashService/hashService.js";
import {FileService} from "../fileService/fileService.js";
import {ZipService} from "../zipService/zipService.js";

export class CommandService {
    static parseCommand(commandString) {
        const items = commandString.trim().split(" ");
        return {command: items[0], args: items.slice(1)}
    }

    static async executeCommand(commandString) {
        const {command, args} = commandString;
        let filePath, copyFilePath, compressDest;
        switch (command) {
            case 'up':
                await navigationService.setDir('..');
                break;
            case 'ls':
                await navigationService.getList();
                break;
            case 'cd':
                await navigationService.setDir(args[0]);
                break;
            case 'os':
                OperatingSystemService.getInfo(args[0]);
                break;
            case 'hash':
                filePath = navigationService.getFilepath(args[0]);
                await HashService.getHash(filePath);
                break;
            case 'cat':
                filePath = navigationService.getFilepath(args[0]);
                await FileService.readFile(filePath);
                break;
            case 'add':
                filePath = navigationService.getFilepath(args[0]);
                await FileService.addNewFile(filePath);
                break;
            case 'rn':
                filePath = navigationService.getFilepath(args[0]);
                await FileService.renameFile(filePath, args[1]);
                break;
            case 'rm':
                filePath = navigationService.getFilepath(args[0]);
                await FileService.removeFile(filePath);
                break;
            case 'cp':
                filePath = navigationService.getFilepath(args[0]);
                copyFilePath = navigationService.getFilepath(args[1]);
                await FileService.copyFile(filePath, copyFilePath);
                break;
            case 'mv':
                filePath = navigationService.getFilepath(args[0]);
                copyFilePath = navigationService.getFilepath(args[1]);
                await FileService.moveFile(filePath, copyFilePath);
                break;
            case 'compress':
                filePath = navigationService.getFilepath(args[0]);
                compressDest = navigationService.getFilepath(args[1]);
                await ZipService.compressFile(filePath, compressDest);
                break;
            case 'decompress':
                filePath = navigationService.getFilepath(args[0]);
                compressDest = navigationService.getFilepath(args[1]);
                await ZipService.decompressFile(filePath, compressDest);
                break;
            default:
                throw new Error(ERRORS.INVALID_INPUT);
        }
    }
}