// nodejs file

var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('..', '../app/systemConfig.js');
builder.loadConfig('../test/systemConfig.test.js');
// var builder = new Builder('./out', '../app/systemConfig.js');
//builder.loadConfig('../app/systemConfig.js');

var config = {
    defaultJSExtensions: true,
    paths: {
        "npm:*": "../../node_modules/*",
        'angular2/*': '../../node_modules/angular2/*',
        'rxjs/*': '../../node_modules/rxjs/*',
        "redux": "../../node_modules/redux/dist/redux",
        "redux-logger": "../../node_modules/redux-logger/dist/index",
        "angular2-redux-store": "../../node_modules/angular2-redux-store/lib/ReduxStore",
        "reflect-metadata": "../../node_modules/reflect-metadata/Reflect",
        "immutable": "../../node_modules/immutable/dist/immutable",
    }  
}

function buildDone(){
    console.log('Build complete');
}
function error(err){
    console.log('Build error');
    console.log(err);
}

// // all in one build
// console.log("Building bundle...");
// builder.bundle('app.js', 'out/app.bundle.js', { minify: true, sourceMaps: true, config: config })
//    .then(buildDone).catch(error);

// all in one build
console.log("Building bundle...");
builder.bundle('appbuild/app/**/*.js', 'out/app.bundle.js', { minify: false, sourceMaps: true, config: config })
    .then(buildDone).catch(error);

// // https://github.com/systemjs/builder
// // 3rd party bundle: build everything including dependencies -> except the app module itself
// console.log("Building dependencies...");
// builder.bundle('appbuild/app/**/*.js - [appbuild/app/**/*.js]', 'out/app.dep.bundle.js', { minify: true, sourceMaps: false, config: config })
//     .then(buildDone).catch(error)
//     .then(function(){
//         // application bundle
//         console.log("Building app without dependencies...");
//         builder.bundle('appbuild/app/app.js - bundle/out/app.dep.bundle.js', 'out/app.bundle.js', { minify: true, sourceMaps: true, config: config })
//             .then(buildDone).catch(error);
// })