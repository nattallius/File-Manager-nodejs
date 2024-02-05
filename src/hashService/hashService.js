import fs from "fs";
import crypto from "crypto";
import {ERRORS} from "../constants/errors.js";

export class HashService {
    static async getHash(filePath) {
        try {
            await new Promise((resolve, reject) => {
                const fh = fs.createReadStream(filePath);
                const hash = crypto.createHash('sha256');
                hash.setEncoding('hex');


                fh.on('end', () => {
                    hash.end();
                    console.log(`Hash of the file - ${hash.read()}`);
                    resolve();
                });
                fh.on('error', reject);
                fh.pipe(hash);
            });
        } catch (e) {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }
}