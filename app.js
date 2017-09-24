import path from 'path';
import Importer from './lib/Importer';

const importer = new Importer(path.join(__dirname, './data'));

setTimeout(() => {
    importer.import('MOCK_DATA.csv').then(data => {
        console.log('prom', data.length);
    });

    console.log(importer.importSync('MOCK_DATA (1).csv').length);
}, 5000);