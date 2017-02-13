'use strict';
// require('babel-plugin-transform-es2015-modules-commonjs')
// require('babel-plugin-transform-class-properties')
// require('babel-plugin-transform-object-rest-spread')
// require('babel-plugin-syntax-trailing-function-commas')
// require('./app.js');


require("babel-core/register")({
    "plugins": ["transform-react-constant-elements"],
    "presets": [
        "es2015",
        "stage-0"
    ]
});
require("babel-polyfill");
require('./app.js');
