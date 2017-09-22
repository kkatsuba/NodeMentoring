import path from 'path';
import fs from 'fs';
import EventEmitter from 'events';
import { checksum } from './helpers';

export default class DirWatcher {
    constructor() {
        this._fsCache = {};
        this._timeoutCache = {};

        this.fsEmitter = new EventEmitter();
    }

    _readFile(filePath) {
        return new Promise((res, rej) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return rej(new Error('Internal error during file reading'));
                }
                res(data);
            });
        });
    }

    standardFsWatch(dirPath, delay = 5000) {
        fs.watch(dirPath, async (err, files) => {
            const filePath = path.join(dirPath, files);
            const fileData = await this._readFile(filePath);
            const fileSum = checksum(fileData);

            if (this._fsCache[filePath] && this._fsCache[filePath] === fileSum) {
                return;
            }

            const time = setTimeout(() => {
                this.fsEmitter.emit('dirwatcher:changed', fileData);
                this._fsCache[filePath] = fileSum;
                clearTimeout(time);
            }, delay);
        });

        return this.fsEmitter;
    }

    watch(dirPath, delay = 5000) {

    }
}