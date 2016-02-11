System.config({
    packages: {
        "app": {
            defaultExtension: "js",
            format: "register", // system.register
            main: "app" // app.js
        }
    },
    paths: {
        "npm:*": "/node_modules/*"
    },
    map: {
        "redux": "npm:redux/dist/redux.js",
        "redux-logger": "npm:redux-logger/dist/index.js",
        "angular2-redux-store": "npm:angular2-redux-store/lib/ReduxStore.js",
    }
});