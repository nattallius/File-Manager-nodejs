import os from 'os';
import {ERRORS} from "../constants/errors.js";

export class OperatingSystemService {
    static getInfo(command) {
        switch (command) {
            case '--eol':
                this.getEOL();
                break;
            case '--cpus':
                this.getCpus();
                break;
            case '--homedir':
                this.getHomedir();
                break;
            case '--username':
                this.getUsername();
                break;
            case '--architecture':
                this.getArchitecture();
                break;
            default:
                throw new Error(ERRORS.INVALID_INPUT)
        }
    }

    static getCpus() {
        const cpuInfo = os.cpus();
        console.log(`Overall amount of CPUS - ${cpuInfo.length}`);
        for (let cpu of cpuInfo) {
            console.log(`${cpu.model} - Speed ${cpu.speed/1000} GHz`);
        }
    }

    static getEOL() {
        console.log(`End of line marker - ${JSON.stringify(os.EOL)}`);
    }

    static getHomedir() {
        console.log(`Your node directory - ${os.homedir()}`);
    }

    static getUsername() {
        console.log(`Your system username - ${os.userInfo().username}`);
    }

    static getArchitecture() {
        console.log(`CPU architecture ${process.arch}`);
    }
}