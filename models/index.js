module.exports = {
    Product: require('./product'),
    User: require('./user')
};

/**
 * If folder has a lot of models or contains sub folders
 * better to use below code, just to save time for writing 100500++ `require` ;(.
 * Can work unstable!!! Also using this solution most of IDEs will not have IntelliSense,
 * because of it is dynamic module.
 */
// const fs = require('fs');
// const path = require('path');
// const normalizedPath = path.normalize(__dirname);
// const entryPoint = 'index.js';
// const _exports = {};
//
// const defineExports = (loadedModule) => {
//     if (loadedModule.name) {
//         _exports[loadedModule.name] = loadedModule;
//     } else {
//         for (const key in loadedModule) {
//             if (!loadedModule.hasOwnProperty(key)) {
//                 continue;
//             }
//             _exports[key] = loadedModule[key];
//         }
//     }
// };
//
// const readDir = (dir, subDir = '') => {
//     fs.readdirSync(dir).forEach(file => {
//         try {
//             if (file !== entryPoint) {
//                 const loadedModule = require(`./${subDir ? subDir + '/' : ''}` + file);
//                 defineExports(loadedModule);
//             }
//         } catch (e) {
//             readDir(path.join(__dirname, subDir, file), `${subDir}/${file}`);
//         }
//     });
// };
//
// readDir(normalizedPath);
// module.exports = _exports;