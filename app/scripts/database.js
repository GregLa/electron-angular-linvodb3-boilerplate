// LinvoDB is a Node.js/NW.js/Electron persistent DB with MongoDB / Mongoose-like features and interface. > https://github.com/Ivshti/linvodb3
// Require LinvoDB
var LinvoDB = require("linvodb3");

// Initialize the default store to level-js - which is a JS-only store which will work without recompiling in NW.js / Electron
LinvoDB.defaults.store = { db: require("level-js") };
// Set dbPath - this should be done explicitly and will be the dir where each model's store is saved
LinvoDB.dbPath = process.cwd();

// New model; Notes is the constructor
var Notes = new LinvoDB("notes", { text : String});