import DirWatcher from './DirWatcher';

export default class Importer {
    constructor() {
        this.watcher = new DirWatcher();
    }

    async importFs(path) {
        await this.watcher.watch(path);
    }

    importFsSync(path) {
        this.watcher.standardFsWatch(path).on('dirwatcher:changed', (err, data) => {
            console.log(err);
        });
    }

    async import(path) {
        await this.watcher.watch(path);
    }

    importSync(path) {
        this.watcher.standardFsWatch(path).on('dirwatcher:changed', (err, data) => {
            console.log(err);
        });
    }
}