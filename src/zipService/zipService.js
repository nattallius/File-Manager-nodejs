import {ERRORS} from "../constants/errors.js";
import fs from "fs";
import path from "path";
import zlib from 'zlib';

export class ZipService {
    static async compressFile(sourceFilePath, destinationDir) {
        try {
            const fileName = path.basename(sourceFilePath);
            const compressedFilePath = path.join(destinationDir, `${fileName}.br`);
            await new Promise((resolve, reject) => {
                const reader = fs.createReadStream(sourceFilePath);
                const writer = fs.createWriteStream(compressedFilePath);

                const brotli = zlib.createBrotliCompress();

                reader.on('error', (err) => {
                    reject();
                });
                writer.on('error', (err) => {
                    reject();
                });
                const stream = reader.pipe(brotli).pipe(writer);

                stream.on('finish', () => {
                    console.log('File compressed!');
                    resolve();
                });
            })
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }
    }

    static async decompressFile(sourceFilePath, destinationPath) {
        try {
            const fileName = path.basename(sourceFilePath);
            const ext = path.parse(sourceFilePath).ext;
            if (ext !== '.br') throw new Error();

            const decompressedFileName = path.parse(sourceFilePath).name;
            const decompressedFilePath = path.join(destinationPath, decompressedFileName);
            await new Promise((resolve, reject) => {
                const reader = fs.createReadStream(sourceFilePath);
                const writer = fs.createWriteStream(decompressedFilePath);

                const brotli = zlib.createBrotliDecompress();

                reader.on('error', (err) => {
                    reject();
                });
                writer.on('error', (err) => {
                    reject();
                });
                const stream = reader.pipe(brotli).pipe(writer);

                stream.on('finish', () => {
                    console.log('File decompressed!');
                    resolve();
                });
            })
        } catch {
            throw new Error(ERRORS.OPERATION_FAILED);
        }

    }
}