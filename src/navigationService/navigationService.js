import os from 'os';
import path from "path";
import fs from "fs/promises";
import {ERRORS} from "../constants/errors.js";

export class NavigationService {
    constructor() {
        this.currentDir = os.homedir();
    }

    get dir() {
        return this.currentDir;
    }

    async setDir(pathCommand) {
        try {
            const newPath = path.resolve(this.currentDir, pathCommand);
            const status = await fs.stat(newPath);
            if (!status.isDirectory()) {
                throw new Error();
            }
            this.currentDir = newPath;
        } catch (e) {
            throw new Error(ERRORS.INVALID_INPUT);
        }
    }

    async getList() {
        try {
            let files = [];
            let folders = [];
            const items = await fs.readdir(this.currentDir, {withFileTypes: true});

            items.forEach((item) => {
                if (item.isDirectory()) {
                    folders.push(item.name);
                } else {
                    files.push(item.name);
                }
            });

            files.sort();
            folders.sort();

            files = files.map((item) => ({Name: item, Type: 'file'}))
            folders = folders.map((item) => ({Name: item, Type: 'directory'}));

            console.table([...folders, ...files]);

        } catch (err) {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    getFilepath(filePath) {
        try {
            return path.resolve(this.currentDir, filePath);
        } catch {
            throw new Error(ERRORS.INVALID_INPUT);
        }
    }
}

export const navigationService = new NavigationService();
