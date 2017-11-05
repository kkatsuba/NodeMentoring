import dev from './dev';

module.exports = {
    dev
}[process.env.NODE_ENV || 'dev'];