import path from 'path';
import Importer from './lib/Importer';

const importer = new Importer();
importer.importFsSync(path.join(__dirname, './data'));

const shit = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('i come');
        }, 10000);
    });
};

shit();
console.log('after shit 1');

(async() => {
    console.log('ohh shit 2 <-');
    const wait = await shit();
    console.log('ohh shit 2', wait);
})();
console.log('after shit 2');


