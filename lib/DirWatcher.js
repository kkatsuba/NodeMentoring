import Papa from 'papaparse';
import path from 'path';
import fs from 'fs';
import EventEmitter from 'events';
import { checksum } from './helpers';

export default class DirWatcher {
    constructor() {
        this._cache = {};
        this._interval = null;

        this.intervalEmitter = new EventEmitter();
    }

    _getFileExtension = (file) => file.slice(file.lastIndexOf('.') + 1);

    _readDir = (dirPath) => fs.readdir(dirPath, (err, files) => {
        const realFiles = files.filter(fileName => {
            return fs.lstatSync(path.join(dirPath, fileName)).isFile() && this._getFileExtension(fileName) === 'csv';
        });

        const data = {};
        realFiles.forEach(async (file) => {
            const fileData = fs.readFileSync(path.join(dirPath, file), 'utf-8');
            const fileSum = checksum(fileData);

            if (this._cache[file] === fileSum) {
                return;
            }

            data[file] = Papa.parse(fileData, { header: true }).data;
            this._cache[file] = fileSum;
        });

        if (Object.keys(data).length > 0) {
            this.intervalEmitter.emit('dirwatcher:changed', data);
        }
    });

    watch(dirPath, delay = 2000) {
        if (!fs.lstatSync(dirPath).isDirectory()) {
            throw new Error('First param must be valid path to directory');
        }

        this._interval = setInterval(this._readDir, delay, dirPath);

        return this.intervalEmitter;
    }
}