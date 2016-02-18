System.config({
    packages: {
        "appbuild": {
            defaultExtension: "js",
            format: "register", // system.register
            main: "app/app" // app/app.js
        }
    },
    paths: {
        "npm:*": "/node_modules/*"
    },
    map: {
        "immutable": "npm:immutable/dist/immutable.js",
        "redux": "npm:redux/dist/redux.js",
        "redux-logger": "npm:redux-logger/dist/index.js",
        "angular2-redux-store": "npm:angular2-redux-store/lib/ReduxStore.js",
        "reflect-metadata": "npm:reflect-metadata/Reflect.js",
        "crypto": "@empty" // ignore the crypto dependency
    }
});