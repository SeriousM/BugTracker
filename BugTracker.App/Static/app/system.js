System.config({
    packages: {
        "app": {
            defaultExtension: "js",
            format: "register", // system.register
            main: "app" // app.js
        }
    },
    map: {
        "redux": "/node_modules/redux/dist/redux.js",
        "angular2-redux-store": "/node_modules/angular2-redux-store/lib/ReduxStore.js",
    }
});