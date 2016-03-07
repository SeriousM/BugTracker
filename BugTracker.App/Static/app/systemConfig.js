System.config({
    defaultExtension: "js",
    baseURL: "/static",
    packages: {
        "appbuild": {
            defaultExtension: "js",
            format: "register", // system.register
            main: "app/app" // app/app.js
        }
    },
    paths: {
        "npm:*": "/node_modules/*",
        //"angular2/*": "/node_modules/angular2/*.js"
    },
    map: {
        // add mappings only for packages which does not register themself with system.js (like angular2)
        "angular2/core": "npm:angular2/bundles/angular2.dev.js",
        "angular2/router": "npm:angular2/bundles/router.dev.js",
        "angular2/http": "npm:angular2/bundles/http.dev.js",
        "immutable": "npm:immutable/dist/immutable.js",
        "redux": "npm:redux/dist/redux.js",
        "redux-logger": "npm:redux-logger/dist/index.js",
        "angular2-redux-store": "npm:angular2-redux-store/lib/ReduxStore.js",
        "reflect-metadata": "npm:reflect-metadata/Reflect.js",
        "crypto": "@empty" // ignore the crypto dependency
    }
});