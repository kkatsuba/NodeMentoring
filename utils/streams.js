#!/usr/bin/env node

require('colors');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const Papa = require('papaparse');
const request = require('request');

const dirError = () => process.stdout.write('Something went wrong. Please check is path valid or file exists.\n'.red);

const realPath = (filePath) => path.isAbsolute(filePath) ? filePath : path.join(__dirname, ...path.join(filePath).split(path.sep));

const checkExt = (filePath, ext) => (filePath.split('.') || []).pop() === ext;

const inputOutput = (filePath) => {
    const readStream = fs.createReadStream(realPath(filePath));
    readStream.pipe(process.stdout);
    readStream.on('error', dirError);
};

const stdInToUpper = () => {
    process.stdout.write('Type CTRL+C to exit\n');
    process.stdin.pipe(through2((chunk, enc, cb) => {
        cb(null, '>> '.green + chunk.toString().toUpperCase());
    })).pipe(process.stdout);
};

const csvToJson = (filePath, out = process.stdout) => {
    if (!checkExt(filePath, 'csv')) {
        process.stdout.write('Path it wrong or file extension is not CSV.\n'.red);
        return;
    }

    const readStream = fs.createReadStream(realPath(filePath));
    readStream.pipe(through2(function(chunk, enc, cb) {
        const res =  Papa.parse(chunk.toString(), { header: true }).data;
        cb(null, JSON.stringify(res));
    })).pipe(out);
    readStream.on('error', dirError);
};

const csvToJsonSave = (filePath) => {
    const pathFragments = realPath(filePath).split('.') || [];
    const outPath = pathFragments.pop() === 'csv' ? pathFragments.join('.') + '.json' : null;

    if (!outPath) {
        return dirError();
    }

    const writeStream = fs.createWriteStream(outPath);
    csvToJson(filePath, writeStream);
    writeStream.on('error', dirError);
};

const bundleCss = (dirPath) => {
    const dir = realPath(dirPath);
    if (!fs.existsSync(dir)) {
        return dirError();
    }

    fs.readdir(dir, (err, files) => {
        if (err) {
            return dirError();
        }

        const outStream = fs.createWriteStream(path.join(dir, 'bundle.css'));
        files.forEach(file => {
            if (file !== 'bundle.css') {
                fs.createReadStream(path.join(dir, file)).pipe(outStream, { end: false });
            }
        });

        request
            .get('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css')
            .pipe(outStream);

        outStream.on('error', dirError);
    });
};

const printHelpMessage = () => {
    process.stdout.write('Usage: streams.js [options]');
    process.stdout.write('\nOptions:' +
        '\n  -a, --action   Must me one of this: ' +
        '\n                   io             writes content of --file to stdout' +
        '\n                   upper          writes stdin into stdout in upper case' +
        '\n                   csv-json       writes contend of csv --file into stdout as json object' +
        '\n                   csv-json-save  writes contend of csv --file into the same directory with json extension' +
        '\n                   bundle-css     concat all .css files in directory --path' +
        '\n  -f, --file     Path for file. Can be relative or absolute' +
        '\n  -p, --path     Path for directory. Can be relative or absolute. NOTE: for Windows path must be in C:\\dir or C:/dir format' +
        '\n  -h, --help\n'
    );
};

const applyAgruments = () => {
    const wrongArgumentsMsg = `${'Wrong number of arguments.'.red}\nUse --help or -h to see availiable options.\n`;
    const argvKeys = Object.keys(argv);
    if (argvKeys.length === 1) {
        process.stdout.write(wrongArgumentsMsg);
        return;
    }

    const action = argv.action || argv.a;
    const file = argv.file || argv.f;
    const path = argv.path || argv.p;

    if (argv.help || argv.h) {
        return printHelpMessage();
    }

    if (action && file) {
        switch (action) {
            case 'io': return inputOutput(file);
            case 'csv-json': return csvToJson(file);
            case 'csv-json-save': return csvToJsonSave(file);
        }
    }

    if (action === 'bundle-css' && path) {
        return bundleCss(path);
    }
    
    if (action === 'upper') {
        return stdInToUpper();
    }

    process.stdout.write(wrongArgumentsMsg);
};

if (require.main === module) {
    applyAgruments();
} else {
    module.exports = {
        inputOutput,
        stdInToUpper,
        csvToJson,
        csvToJsonSave,
        bundleCss
    };
}
