import fs from "fs";
import {writeFile, rename, access, rm} from "fs/promises"
import {ERRORS} from "../constants/errors.js";
import path from 'path';

export class FileService {
    static async readFile(filePath) {
        try {
            await new Promise((resolve, reject) => {
                const reader = fs.createReadStream(filePath);
                reader.on('data', function (chunk) {
                    console.log(chunk.toString());
                    resolve();
                });
                reader.on('error', () => {
                    reject();
                })
            })
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async addNewFile(filePath) {
        try {
            await writeFile(filePath, '', {flag: 'wx'});
            console.log('File Created!')
        } catch (e) {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async renameFile(oldFilePath, newFileName) {
        try {
            const dir = path.dirname(oldFilePath);
            const newFilePath = path.join(dir, newFileName);
            const fileExists = await access(newFilePath, fs.constants.F_OK).then(() => true, () => false);
            if (fileExists) throw new Error();

            await rename(oldFilePath, newFilePath);
            console.log('File renamed!');
        } catch (e) {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async removeFile(filePath) {
        try {
            await rm(filePath);
            console.log('File removed!')
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async moveFile(sourceFilePath, newFilePath) {
        try {
            await this.copyFile(sourceFilePath, newFilePath);
            await this.removeFile(sourceFilePath);
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async copyFile(sourceFilePath, newFilePath) {
        try {
            const fileName = path.basename(sourceFilePath);
            const newFile = path.join(newFilePath, fileName);
            await new Promise((resolve, reject) => {
                const reader = fs.createReadStream(sourceFilePath);
                const writer = fs.createWriteStream(newFile);

                reader.on('error', (err) => {
                    reject();
                });
                writer.on('error', (err) => {
                    reject();
                });
                writer.on('close', () => {
                    console.log('File copied!');
                    resolve();
                })

                reader.pipe(writer);
            })
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }
}