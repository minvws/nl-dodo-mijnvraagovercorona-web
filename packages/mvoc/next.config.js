/**
 * Fuse.js needs te be transpiled because it contains object spread which is not supported by IE11 or older Edge versions
 */
const withTM = require('next-transpile-modules')(['@quarantaine/common']);

module.exports = withTM();
