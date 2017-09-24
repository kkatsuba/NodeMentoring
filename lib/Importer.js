import DirWatcher from './DirWatcher';

export default class Importer {
    constructor(path) {
        this.watcher = new DirWatcher();
        this.data = null;

        this.watcher.watch(path).on('dirwatcher:changed', data => this.data = data);
    }

    getAllData = () => this.data;

    import(fileName) {
        return new Promise((res) => {
            if (!fileName) {
                return res(this.data);
            }

            return res(this.data[fileName]);
        });
    }

    importSync = (fileName) => fileName ? this.data[fileName] : this.data;
}