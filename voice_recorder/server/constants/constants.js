const path = require('path');

const BASE_DIR = `${__dirname}/../..`;
module.exports = {
    BASE_DIR: path.normalize(BASE_DIR),
    UPLOADS_DIR: path.join(BASE_DIR, 'server/uploads'),
    TEMPLATES_DIR: path.join(BASE_DIR, 'client/build')
}
