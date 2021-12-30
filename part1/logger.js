'use strict';

const logger = ((options) => {
    if (!options) {
        throw new Error('Options are missing');
    }

    if (!options.level) {
        throw new Error('Level is missing');
    }

    return (req, res, next) => {
        console.log(`(${options.level}) ${req.method} ${req.path}`);
        next();
    }
});

module.exports = logger;