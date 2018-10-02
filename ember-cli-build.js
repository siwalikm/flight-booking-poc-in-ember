'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = process.env.EMBER_ENV;  
const isTesting = environment === 'test';
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss'
    },
    hinting: !isTesting
  });
  return app.toTree();
};
